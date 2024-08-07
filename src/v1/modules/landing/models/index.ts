import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Enum } from '../../../../constants'
import { IContactUsForm } from '../interface'

@Entity()
export class ContactUsForm implements IContactUsForm {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, type: 'varchar' })
  name: string

  @Column({ nullable: false, type: 'varchar' })
  email: string

  @Column({ nullable: true, type: 'varchar' })
  followersCount: string

  @Column({ nullable: true, type: 'varchar' })
  profileLink: string

  @Column({ nullable: true, type: 'varchar' })
  mobileNo: string

  @Column({ nullable: true, type: 'text' })
  message: string

  @Column({
    type: 'enum',
    enum: Enum.PersonType,
    nullable: false,
  })
  personType: Enum.PersonType

  @Column({ type: 'boolean', default: false })
  viewed: boolean
}
