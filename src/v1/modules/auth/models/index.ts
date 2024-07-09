import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'
import { Enum } from '../../../../constants'
import { IRole, type IUser } from '../interface'
import "reflect-metadata";

@Entity()
export class Role extends BaseEntity implements IRole{
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: Enum.ROLES,
    nullable: false
  })
  name: Enum.ROLES

  @OneToMany(()=>User,(user)=>user.role)
  users: User[]
}

@Entity()
export class User extends BaseEntity implements IUser {
  @Column({primary: true,type:'varchar'})
  id: string

  @Column({ unique: true,type:'varchar' })
  email: string


  @ManyToOne(()=>Role,(role)=>role.users)
  role: Role
}

