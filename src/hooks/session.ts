import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
    cookieName: "session",
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
    },
}