import { notify } from "https://deno.land/x/notifier/mod.ts";
import { sleep } from "https://deno.land/x/sleep/mod.ts";
import {
  BestBuyStockChecker,
  MicrosoftStockChecker,
  StockChecker,
} from "./StockChecker.ts";
import { Config } from "./config.ts";
import { Twilio } from "https://deno.land/x/twilio@0.1.1/Twilio.ts";
const stockCheckers: StockChecker[] = [
  new MicrosoftStockChecker(),
  new BestBuyStockChecker(),
];

const minWaitTime = 15;
const maxWaitDelta = 65;

const sender = new Twilio(
  Config.twilioAccountSid,
  Config.twilioAuthToken,
  Config.twilioSid,
  Config.twilioSendNumber,
);

while (true) {
  console.log("checking stock");

  for (let i = 0; i < stockCheckers.length; i++) {
    const checker = stockCheckers[i];
    console.log(`Checking stock for ${checker.siteName}`);
    if (await checker.checkStock()) {
      await notify(
        checker.siteName,
        checker.notitifcationText,
      );
      await sender.sendMessage(
        Config.notifyingNumber,
        `Xbox Series X available from ${checker.siteName} at ${checker.url}`,
      );
    }
  }
  const randomSleep = minWaitTime + Math.ceil(Math.random() * maxWaitDelta);
  console.log(`Waiting ${randomSleep} seconds to check again`);
  await sleep(randomSleep);
}
