import dotenv from 'dotenv';
dotenv.config();

import { startServer } from './server';
import { WebScraper } from './services/web-scraper';

startServer();

// const scraper = new WebScraper();
// scraper.scrapeSite(process.env.SITE_URL!).catch();