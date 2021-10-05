import { firefoxFetch } from "./firefoxFetch.ts";
export interface StockChecker {
  checkStock(): Promise<boolean>;
  siteName: string;
  notitifcationText: string;
  url: string;
}

export class MicrosoftStockChecker implements StockChecker {
  siteName = "Microsoft";
  notitifcationText = "Series X is available on microsoft.com";
  url = "https://www.xbox.com/en-us/configure/8wj714n3rbtl";
  async checkStock(): Promise<boolean> {
    const results = await firefoxFetch(this.url, "www.xbox.com");
    const body = await results.text();
    return !body.includes("Out of stock");
  }
}

export class BestBuyStockChecker implements StockChecker {
  siteName = "Best Buy";
  notitifcationText = "Series X is available on bestbuy.com";
  url =
    "https://www.bestbuy.com/site/microsoft-xbox-series-x-1tb-console-black/6428324.p?skuId=6428324";
  async checkStock(): Promise<boolean> {
    const results = await firefoxFetch(this.url, "www.bestbuy.com");
    const body = await results.text();
    return !body.includes('data-button-state="SOLD_OUT"');
  }
}
