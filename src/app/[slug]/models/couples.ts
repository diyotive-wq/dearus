import { Timestamp } from "firebase/firestore";

export interface Couples {
    id?: string | null;
    male_bride?: string | null;
    female_bride?: string | null;
    header_image?: string | null;
    header_image_potrait?: string | null;
    link_maps?: string | null;
    date?:  Timestamp | null;
    address?: string | null;
    url_name?: string | null;
    color?: Color | null;
    introduction_title?: string | null;
    gallery_image?: string[] | null;
}

export interface Color {
    theme: string;
    primary: string;
    secondary: string;
    tertiary: string;
}