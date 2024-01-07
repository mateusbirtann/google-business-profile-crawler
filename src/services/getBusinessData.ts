import { initializeBrowser } from './browser';
import { navigateToGoogleMaps } from './navigateToGoogleMaps';
import { scrapeData } from './scrapeData';

export async function getBusinessData() {
  const browser = await initializeBrowser();
  const page = await browser.newPage();
  const query = "mecanico maricá";
  await navigateToGoogleMaps(page, query);
  const scrapedData = await scrapeData(page, browser);
  const business = scrapedData
  return business;
}