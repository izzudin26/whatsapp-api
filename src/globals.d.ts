import type { WASocket } from "@whiskeysockets/baileys";

declare global {
  namespace globalThis {
    var whatsapp: WASocket;
  }
}
