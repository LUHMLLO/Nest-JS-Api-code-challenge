import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { ClientsEntity } from 'src/clients/clients.entity';
import { AuthRoles } from 'src/utils.enums';
import { ApiProperty } from '@nestjs/swagger';

@Entity('usuarios')
export class UsersEntity {
  @ApiProperty({ type: BigInt })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ type: () => ClientsEntity, })
  @OneToOne(() => ClientsEntity, (client) => client.user)
  @JoinColumn({ name: 'client_id' })
  client: ClientsEntity

  @ApiProperty({ type: String, })
  @Column()
  avatar: string;

  @ApiProperty({ type: String, })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ type: String, })
  @Column()
  password: string;

  @ApiProperty({ enum: () => AuthRoles, })
  @Column({ type: 'enum', enum: AuthRoles, })
  role: AuthRoles;

  @ApiProperty({ type: Date, })
  @Column()
  created: Date;

  @ApiProperty({ type: Date, })
  @Column({ nullable: true })
  modified: Date;

  @ApiProperty({ type: Date, })
  @Column({ nullable: true })
  accessed: Date;
}