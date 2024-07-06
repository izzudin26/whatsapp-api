import { Router } from "express";
import { transformPhoneNumberToId } from "../utils/whatsapp.utils";
import { isJidUser } from "@whiskeysockets/baileys";
import { HttpException } from "@/error/http";
import { connectToWhatsApp } from "@/service/whatsapp.service";

const router = Router();

router.get("/check", (req, res, next) => {
  try {
    const phone = req.query.phone as string;
    const jid = transformPhoneNumberToId(phone);
    const isPhoneValid = isJidUser(jid);
    if (!isPhoneValid) throw new HttpException(400, "Invalid Phone Number");

    const data = {
      statusCode: 200,
      data: {
        phone,
        jid,
      },
    };

    return res.send(data).status(200);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const phone = req.body.phone;
    const text = req.body.message;

    const idPhone = transformPhoneNumberToId(phone);
    const isPhoneValid = isJidUser(idPhone);

    if (!isPhoneValid) throw new HttpException(400, "Invalid Phone Number");

    try {
      await global.whatsapp.sendMessage(idPhone, { text });
    } catch (error) {
      global.whatsapp = await connectToWhatsApp();
      await global.whatsapp.sendMessage(idPhone, { text });
    }

    return res
      .send({
        statusCode: 200,
        message: "OK",
        data: {
          phone: idPhone,
          text,
        },
      })
      .status(200);
  } catch (error) {
    next(error);
  }
});

export default router;
