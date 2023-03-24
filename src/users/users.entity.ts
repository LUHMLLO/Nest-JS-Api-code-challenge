import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { ClientsEntity } from 'src/clients/clients.entity';
import { AuthRoles } from 'src/utils.enums';

@Entity('usuarios')
export class UsersEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @OneToOne(() => ClientsEntity, (client) => client.user)
    @JoinColumn({ name: 'client_id' })
    client: ClientsEntity

    @Column()
    avatar: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: AuthRoles,
      })
    role: AuthRoles;

    @Column()
    created: Date;

    @Column({ nullable: true })
    modified: Date;

    @Column({ nullable: true })
    accessed: Date;
}