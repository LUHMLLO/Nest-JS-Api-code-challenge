export interface User {
    id?: string

    username: string
    password?: string

    avatar?: string
    name?: string
    email: string
    phone: string

    role?: string

    created?: Date
    modified?: Date
    accessed?: Date
}