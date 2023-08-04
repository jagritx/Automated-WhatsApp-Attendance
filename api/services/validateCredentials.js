import scraper from "../../scraper/scraper.js";

async function credentialsValid(username, password) {
  try {
    const res = await scraper({ username, password });
    return true;
  } catch (error) {
    return false;
  }
}

export default credentialsValid;
