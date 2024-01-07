export async function navigateToGoogleMaps(page: any, query: any) {
  try {
    await page.goto(`https://www.google.com/maps/search/${query.split(" ").join("+")}`);
  } catch (error) {
    console.log("error going to page");
  }
}