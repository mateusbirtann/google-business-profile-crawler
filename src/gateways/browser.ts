import puppeteerExtra from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";

export async function initializeBrowser() {
  puppeteerExtra.use(stealthPlugin());
  const browser = await puppeteerExtra.launch({
    headless: false,
    executablePath: '/usr/bin/chromium-browser',
  });
  return browser;
}