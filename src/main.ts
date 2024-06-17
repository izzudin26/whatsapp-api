import { app } from "./server";
import { connectToWhatsApp } from "./service/whatsapp.service";
const port = process.env.PORT || "3000";

app.listen(port, async () => {
  console.log(`Running on http://localhost:3000`);
  console.log("load whatsapp session");

  global.whatsapp = await connectToWhatsApp();
});
