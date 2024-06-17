import express from "express";
import whatsappRoute from "./route/whatsapp.route";
import { errorMiddlware } from "./middleware/error";

export const app = express();

app.use(express.json());
app.use("/whatsapp", whatsappRoute);
app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.use(errorMiddlware);
