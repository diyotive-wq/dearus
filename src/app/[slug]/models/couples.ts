import { Timestamp } from "firebase/firestore";

export interface Couples {
    id?: string | null;
    male_bride: string;
    female_bride: string;
    header_image: string;
    header_image_potrait: string;
    link_maps?: string | null;
    date:  Timestamp;
    address: string;
    color?: Color | null;
    introduction_title: string;
    gallery_image: string[];
}

export interface Color {
    theme: string;
    primary: string;
    secondary: string;
    tertiary: string;
}