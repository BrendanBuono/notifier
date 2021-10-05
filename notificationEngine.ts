import { notify } from "https://deno.land/x/notifier/mod.ts";
import { Twilio } from "https://deno.land/x/twilio@0.1.1/Twilio.ts";
import { Config } from "./config.ts";

export enum NotificationType {
  XSX,
}

export interface Notifier {
  send(title: string, message: string): Promise<void>;
}

export class DesktopNotifier implements Notifier {
  async send(title: string, message: string): Promise<void> {
    await notify(title, message);
  }
}

export class SmsNotifier implements Notifier {
  #sender: Twilio;
  #numbersToNotify: string[];
  constructor(numbersToNotify: string[]) {
    this.#sender = new Twilio(
      Config.twilioAccountSid,
      Config.twilioAuthToken,
      Config.twilioSid,
      Config.twilioSendNumber,
    );
    this.#numbersToNotify = numbersToNotify;
  }
  async send(title: string, message: string): Promise<void> {
    for (let i = 0; i < this.#numbersToNotify.length; i++) {
      await this.#sender.sendMessage(
        this.#numbersToNotify[i],
        `${title}: ${message}`,
      );
    }
  }
}

export type NotificationMapping = {
  [key in NotificationType]: Notifier[];
};
export class NotificationEngine {
  #mapping: NotificationMapping;
  constructor(mapping: NotificationMapping) {
    this.#mapping = mapping;
  }

  async notify(
    type: NotificationType,
    title: string,
    message: string,
  ): Promise<void> {
    const notifiers = this.#mapping[type];
    for (let i = 0; i < notifiers.length; i++) {
      await notifiers[i].send(title, message);
    }
  }
}
