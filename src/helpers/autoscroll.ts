import { Page } from "puppeteer";

export async function autoScroll(page: Page) {
  await page.evaluate(async () => {
    const wrapper = document.querySelector('div[role="feed"]');

    await new Promise<void>((resolve, reject) => {
      var totalHeight = 0;
      var distance = 1000;
      var scrollDelay = 2000;

      var timer = setInterval(async () => {
        if (wrapper) {
          var scrollHeightBefore = wrapper.scrollHeight;
          wrapper.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeightBefore) {
            totalHeight = 0;
            await new Promise<void>((resolve) => setTimeout(resolve, scrollDelay));

            // Calculate scrollHeight after waiting
            var scrollHeightAfter = wrapper.scrollHeight;

            if (scrollHeightAfter > scrollHeightBefore) {
              // More content loaded, keep scrolling
              return;
            } else {
              // No more content loaded, stop scrolling
              clearInterval(timer);
              resolve();
            }
          }
        }
      }, 200);
    });
  });
}