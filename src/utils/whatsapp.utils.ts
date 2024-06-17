const suffixPhone = "@s.whatsapp.net";
const suffixGroup = "@g.us";

export function transformPhoneNumberToId(phone: string) {
  const isStartWithZero = phone.at(0) == "0";
  if (isStartWithZero) return "62" + phone.slice(1) + suffixPhone;

  return phone + suffixPhone;
}
