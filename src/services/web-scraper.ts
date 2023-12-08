import puppeteer, { Page } from 'puppeteer';
import * as cheerio from 'cheerio';
import { XataService } from './xata-service';
import { logger } from '../utils/logger';

export class WebScraper {
    private xataService: XataService;

    constructor() {
        this.xataService = new XataService();
    }

    public async scrapeSite(url: string) {
        const siteContentRecords = await this.xataService.getSiteContentRecords() || [];

        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        await page.goto(url);

        const links = await this.getPageLinks(page, url);
        logger.info(`${links.length} unique links found.`);

        for (const link of links) {
            await page.goto(link);

            const siteContentRecord = siteContentRecords.find(record => record.url === link);
            const body = await this.extractPageText(page);

            if (!siteContentRecord) {
                logger.info(`Creating new SiteContent record for ${link}`);
                await this.xataService.createSiteContent(link, body);
            } else {
                const diff = this.xataService.contentDiff(siteContentRecord.body as string, body);

                if (diff) {
                    logger.info(`Updating SiteContent record for ${siteContentRecord.id}`);
                    await this.xataService.updateSiteContent(siteContentRecord, body);
                }
            }
        }

        await browser.close();
    }

    private async getPageLinks(page: Page, url: string) {
        const links = await page.evaluate((siteURL) => {
            const anchorTags = Array.from(document.querySelectorAll('a'));

            const urls: string[] = [];
            anchorTags.forEach(tag => {
                const href = tag.href?.trim();
                if (href && href.includes('http') && href.includes(siteURL)) {
                    urls.push(href);
                }
            });

            return urls;
        }, url);

        // Return a unique array of links
        return Array.from(new Set(links));
    }

    private async extractPageText(page: Page) {
        const body = await page.evaluate(() => {
            for (const script of document.body.querySelectorAll('script')) script.remove();
            for (const noscript of document.body.querySelectorAll('noscript')) noscript.remove();
            for (const iframe of document.body.querySelectorAll('iframe')) iframe.remove();

            return document.body.innerHTML;
        });

        const $ = cheerio.load(body);
        // Remove HTML tags and extract all text
        const text = $('body').text().trim();
        // Remove NBSP unicode (\u00A0)
        const textWithoutNBSP = text.replace(/\u00A0/g, ' ');
        // Replace multiple spaces with a single space
        const textWithoutMultipleSpaces = textWithoutNBSP.replace(/ +/g, ' ');
        // Remove leading spaces from new lines
        const textWithoutLeadingSpaces = textWithoutMultipleSpaces.replace(/^\s+/gm, '');
        // Remove multiple new lines
        return textWithoutLeadingSpaces.replace(/\n{2,}/g, '\n');
    }
}
