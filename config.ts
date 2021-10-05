import { config } from "https://deno.land/x/dotenv/mod.ts";

export class Config {
  static twilioSid: string = config().TWILIO_SID;
  static twilioAccountSid: string = config().TWILIO_ASID;
  static twilioSecret: string = config().TWILIO_SECRET;
  static twilioSendNumber: string = config().TWILIO_NUMBER;
  static twilioAuthToken: string = config().TWILIO_AUTH_TOKEN;
  static notifyingNumber: string = config().NOTIFYING_NUMBER;
}
