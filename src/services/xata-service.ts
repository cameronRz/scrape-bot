import { SiteContentRecord, XataClient } from '../xata';
import { logger } from '../utils/logger';

export class XataService {
  private xata: XataClient;

  constructor() {
    this.xata = new XataClient({ apiKey: process.env.XATA_API_KEY });
  }

  async getSiteContentRecords() {
    try {
      return this.xata.db.SiteContent.getAll();
    } catch (error: any) {
      logger.error(`Error retrieving SiteContent records: ${error.message}`);
    }
  }

  async updateSiteContent(siteContent: SiteContentRecord, body: string) {
    try {
      await this.xata.db.SiteContent.update(siteContent.id, { body });
    } catch (error: any) {
      logger.error(`Error updating SiteContent record ${siteContent.id}: ${error.message}`);
    }
  }

  async createSiteContent(url: string, body: string) {
    try {
      await this.xata.db.SiteContent.create({
        url,
        body,
      });
    } catch (error: any) {
      logger.error(`Error creating SiteContent record: ${error.message}`);
    }
  }

  contentDiff(a: string, b: string) {
    const dp = Array.from(Array(a.length + 1), () => Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) {
      for (let j = 0; j <= b.length; j++) {
        if (i === 0) {
          dp[i][j] = j;
        } else if (j === 0) {
          dp[i][j] = i;
        } else {
          dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
    }

    return dp[a.length][b.length];
  }
}