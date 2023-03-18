import { User } from "../interfaces/users.interface"

export class CreateUserRequest {
    readonly username: User["username"];
    readonly password: User["password"];
    readonly avatar: User["avatar"];
    readonly name: User["name"];
    readonly email: User["email"];
    readonly phone: User["phone"];
    readonly role: User["role"];
}

export class UpdateUserRequest {
    readonly username: User["username"];
    readonly password: User["password"];
    readonly avatar: User["avatar"];
    readonly name: User["name"];
    readonly email: User["email"];
    readonly phone: User["phone"];
    readonly role: User["role"];
}