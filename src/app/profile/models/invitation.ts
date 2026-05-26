import { Timestamp } from "firebase-admin/firestore";

export interface Invitation {
    date?: Timestamp | null;
    id?: string | null;
    url?: string | null;
}