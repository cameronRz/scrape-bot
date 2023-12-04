import dotenv from 'dotenv';
dotenv.config();

import { WebScraper } from './services/web-scraper';

const scraper = new WebScraper();

(async () => {
  await scraper.scrapeSite('https://developer.chrome.com/');
})();