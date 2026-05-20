import CryptoJS from "crypto-js";

export const encrypt = (text: string) => {
  return CryptoJS.AES.encrypt(
    text,
    process.env.NEXT_PUBLIC_ENCRYPT as string
  ).toString();
};

export const decrypt = (cipher: string) => {
  const bytes = CryptoJS.AES.decrypt(
    cipher,
    process.env.NEXT_PUBLIC_ENCRYPT as string
  );
  return bytes.toString(CryptoJS.enc.Utf8);
};
