import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { Enum } from '../../../constants'
import { type IUser } from '../interface'
import "reflect-metadata";

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: false })
  name: string

  @Column({
    type: 'enum',
    enum: Enum.ROLES,
    nullable: false,
  })
  role: Enum.ROLES
}
