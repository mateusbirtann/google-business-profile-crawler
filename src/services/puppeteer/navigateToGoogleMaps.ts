import { Page } from "puppeteer";

export async function navigateToGoogleMaps(page: Page, query: string) {
  try {
    await page.goto(`https://www.google.com/maps/search/${query.split(" ").join("+")}`);
  } catch (error) {
    console.log("error going to page");
  }
}