import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ClientsEntity } from 'src/clients/clients.entity';

@Entity('usuarios')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

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

    @OneToOne(() => ClientsEntity, (client) => client.user)
    client: ClientsEntity
}