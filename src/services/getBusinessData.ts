import { initializeBrowser } from './puppeteer/browser';
import { navigateToGoogleMaps } from './puppeteer/navigateToGoogleMaps';
import { scrapeData } from './scrapeData';

export async function getBusinessData(query: string) {
  const browser = await initializeBrowser();
  const page = await browser.newPage();
  await navigateToGoogleMaps(page, query);
  const business = await scrapeData(page, browser);
  return business;
}