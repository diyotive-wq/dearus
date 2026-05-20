import { Color } from "@/app/[slug]/models/couples"

export interface TemplateDetailModel {
    id?: string | null
    colors?: Color[] | null
    form?: TemplateForm[] | null
    template_name?: string | null
}

export interface TemplateForm {
    name? : string | null
    hint_text?: string | null
    title?: string | null
    color_options?: Color[] | null
    max_upload?: number | null
    input_type?: string | null
    upload_form?: string | null
}