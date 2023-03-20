import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    client: number;

    @Column()
    avatar: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column()
    created: Date;

    @Column()
    modified: Date;

    @Column()
    accessed: Date;
}