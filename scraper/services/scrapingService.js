import scraper from "../scraper.js";
import parser from "../utils/parser.js";
import fetcher from "../controllers/fetchCredentials.js";

async function scrapingService() {
  try {
    const users = await fetcher();
    const results = [];

    for (const user of users) {
      try {
        const scrapedData = await scraper(user);
        const parsedData = parser(scrapedData);
        const { mobile } = user;
        results.push({ parsedData, mobile });
      } catch (error) {
        console.error(
          "An error occurred during scraping for user:",
          user.username
        );
        console.error(error);
        continue;
      }
    }
    return results;
  } catch (error) {
    console.error("An error occurred during fetching users:");
  }
}

export default scrapingService;
