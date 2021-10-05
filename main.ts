import { sleep } from "https://deno.land/x/sleep/mod.ts";
import {
  BestBuyStockChecker,
  MicrosoftStockChecker,
  StockChecker,
} from "./StockChecker.ts";

import { Config } from "./config.ts";

import {
  DesktopNotifier,
  NotificationEngine,
  NotificationMapping,
  NotificationType,
  Notifier,
  SmsNotifier,
} from "./notificationEngine.ts";

const stockCheckers: StockChecker[] = [
  new MicrosoftStockChecker(),
  new BestBuyStockChecker(),
];

const minWaitTime = 15;
const maxWaitDelta = 65;

const numbersToNotify = Config.notifyingNumbers.split(",");
const smsNotifier = new SmsNotifier(numbersToNotify);
const notifationMapper: NotificationMapping = {
  "0": [
    smsNotifier,
    new DesktopNotifier(),
  ],
};

const notificationEngine = new NotificationEngine(notifationMapper);

while (true) {
  console.log("checking stock");

  for (let i = 0; i < stockCheckers.length; i++) {
    const checker = stockCheckers[i];
    console.log(`Checking stock for ${checker.siteName}`);
    if (await checker.checkStock()) {
      await notificationEngine.notify(
        NotificationType.XSX,
        `Xbox Series X available at ${checker.siteName}`,
        `URL: ${checker.url}`,
      );
    }
  }
  const randomSleep = minWaitTime + Math.ceil(Math.random() * maxWaitDelta);
  console.log(`Waiting ${randomSleep} seconds to check again`);
  await sleep(randomSleep);
}
