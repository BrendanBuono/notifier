import { firefoxFetch } from "./firefoxFetch.ts";
import { difference } from "https://deno.land/std@0.110.0/datetime/mod.ts";
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
  lastInStockCheck: Date | undefined = undefined;
  async checkStock(): Promise<boolean> {
    if (this.lastInStockCheck) {
      const lastSuccessfulCheck = difference(
        this.lastInStockCheck,
        new Date(Date.now()),
      );
      if (lastSuccessfulCheck.minutes && lastSuccessfulCheck.minutes < 5) {
        return Promise.resolve(false);
      }
    }
    const results = await firefoxFetch(this.url, "www.xbox.com");
    const body = await results.text();
    const isInStock = !body.includes("Out of stock");
    if (isInStock) {
      this.lastInStockCheck = new Date(Date.now());
    }
    return isInStock;
  }
}

export class BestBuyStockChecker implements StockChecker {
  siteName = "Best Buy";
  notitifcationText = "Series X is available on bestbuy.com";
  url =
    "https://www.bestbuy.com/site/microsoft-xbox-series-x-1tb-console-black/6428324.p?skuId=6428324";
  lastInStockCheck: Date | undefined = undefined;

  async checkStock(): Promise<boolean> {
    if (this.lastInStockCheck) {
      const lastSuccessfulCheck = difference(
        this.lastInStockCheck,
        new Date(Date.now()),
      );
      if (lastSuccessfulCheck.minutes && lastSuccessfulCheck.minutes < 5) {
        return Promise.resolve(false);
      }
    }
    const results = await firefoxFetch(this.url, "www.bestbuy.com");
    const body = await results.text();
    const isInStock = !body.includes('data-button-state="SOLD_OUT"') &&
      !body.includes("We're sorry, something went wrong");
    if (isInStock) {
      this.lastInStockCheck = new Date(Date.now());
    }
    return isInStock;
  }
}
