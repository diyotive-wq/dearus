import { Color } from "@/app/[slug]/models/couples";

export interface InvitationTemplateModel{
    id?: string | null,
    title?: string | null,
    image_url?: string | null,
    color?: Color | null
}