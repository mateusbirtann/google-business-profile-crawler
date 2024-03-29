import * as cheerio from "cheerio";
import { Business } from "../entities/Business";
import { Page, Browser } from "puppeteer";
import { autoScroll } from "../helpers/autoscroll";
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function scrapeData(page: Page, browser: Browser) {
  try {
    await autoScroll(page);
    const html = await page.content();
    await closeBrowser(browser);
    const parents = getParentsFromATags(html);
    // console.log("parents", parents.length);
    const business: Business[] = getBusinessesFromParents(parents);

    const createBusinessPromises = business.map(biz => createBusiness(biz));
    const createdBusinesses = await Promise.all(createBusinessPromises);
    const count = createdBusinesses.filter(Boolean).length;

    console.log(`${count} businesses were saved.`);

    return business;
  } catch (error) {
    console.log("error at googleMaps", (error as Error).message);
  }
}

async function createBusiness(biz: Business) {
  const { placeId, address, category, phone, googleUrl, bizWebsite, storeName, ratingText, stars, numberOfReviews } = biz;

  const formattedPhone = formatPhone(phone);

  try {
    await prisma.googleBusinessProfile.create({
      data: {
        placeId,
        address,
        category,
        phone: formattedPhone,
        googleUrl,
        bizWebsite,
        storeName,
        ratingText,
        stars,
        numberOfReviews
      }
    });
    return true
  }
  catch (error) {
    if ((error as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
      console.log(`error at createBusiness: A business with placeId ${placeId} already exists.`);
    } else {
      console.log("error at createBusiness", (error as Error).message);
    }
  }
}

function formatPhone(phone: string | null): string | null {
  if (phone) {
    let formattedPhone = phone.replace(/\D/g, '');
    if (formattedPhone.length !== 11) {
      return null;
    }
    return formattedPhone;
  }
  return null;
}

async function closeBrowser(browser: any) {
  const pages = await browser.pages();
  await Promise.all(pages.map((page: Page) => page.close()));

  await browser.close();
  console.log("browser closed");
}

function getParentsFromATags(html: string) {
  // get all a tag parent where a tag href includes /maps/place/
  const $ = cheerio.load(html);
  const aTags = $("a");

  // disclaimer: check the type of parents later
  const parents: any[] = [];
  aTags.each((i, el) => {
    const href = $(el).attr("href");
    if (!href) {
      return;
    }
    if (href.includes("/maps/place/")) {
      parents.push($(el).parent());
    }
  });
  return parents
}

function getBusinessesFromParents(parents: any[]) {
  const business: Business[] = [];

  parents.forEach((parent) => {
    const url = parent.find("a").attr("href");
    // get a tag where data-value="Website"
    const website = parent.find('a[data-value="Website"]').attr("href");
    // find a div that includes the class fontHeadlineSmall
    const storeName = parent.find("div.fontHeadlineSmall").text();
    // find span that includes class fontBodyMedium
    const ratingText = parent
      .find("span.fontBodyMedium > span")
      .attr("aria-label");

    // get the first div that includes the class fontBodyMedium
    const bodyDiv = parent.find("div.fontBodyMedium").first();
    const children = bodyDiv.children();
    const lastChild = children.last();
    const firstOfLast = lastChild.children().first();
    const lastOfLast = lastChild.children().last();
    // console.log(lastOfLast)

    business.push({
      placeId: `ChI${url?.split("?")?.[0]?.split("ChI")?.[1]}`,
      address: firstOfLast?.text()?.split("·")?.[1]?.trim(),
      category: firstOfLast?.text()?.split("·")?.[0]?.trim(),
      phone: lastOfLast?.text()?.split("·")?.[1]?.trim(),
      googleUrl: url,
      bizWebsite: website,
      storeName,
      ratingText,
      stars: ratingText?.split("estrelas")?.[0]?.trim().replace(',', '.')
        ? Number(ratingText?.split("estrelas")?.[0]?.trim().replace(',', '.'))
        : null,
      numberOfReviews: ratingText
        ?.split("estrelas")?.[1]
        ?.replace("comentários", "")
        ?.trim()
        ? Number(
          ratingText?.split("estrelas")?.[1]?.replace("comentários", "")?.trim()
        )
        : null,
    });
  });

  return business
}
