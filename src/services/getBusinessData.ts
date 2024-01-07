import { initializeBrowser } from './puppeteer/browser';
import { navigateToGoogleMaps } from './puppeteer/navigateToGoogleMaps';
import { scrapeData } from './scrapeData';

export async function getBusinessData() {
  const query = "mecanico maricá";
  
  const browser = await initializeBrowser();
  const page = await browser.newPage();
  await navigateToGoogleMaps(page, query);
  const business = await scrapeData(page, browser);
  return business;
}