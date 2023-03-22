import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { ClientsEntity } from 'src/clients/clients.entity';

@Entity('usuarios')
export class UsersEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    avatar: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column()
    created: Date;

    @Column({ nullable: true })
    modified: Date;

    @Column({ nullable: true })
    accessed: Date;

    @OneToOne(() => ClientsEntity, (client) => client.user)
    @JoinColumn({ name: 'client_id' })
    client: ClientsEntity
}