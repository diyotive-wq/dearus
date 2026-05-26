import { Invitation } from "./invitation"

export interface user {
    name?: string | null
    email?: string | null
    phone_number?: string | null
    birthdate?: string | null
    address?: string | null
    invitation?: Invitation | null
}

