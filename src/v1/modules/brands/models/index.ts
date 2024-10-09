import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { User } from '../../user/models'
import { IUser } from '../../user/interface'
import { IBrandProfile } from '../interface'
import { Campaign, CampaignParticipants } from '../../campaign/models'
import { ICampaign, ICampaignParticipants } from '../../campaign/interface'
import { PurchaseInvoice } from '../../invoice/models'

@Entity()
export class BrandProfile implements IBrandProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  name: string

  @Column({ type: 'varchar', nullable: false })
  pocFirstName: string

  @Column({ type: 'varchar', nullable: true })
  pocLastName: string

  @OneToOne(() => User, (user) => user.brandProfile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: IUser

  @Column({ type: 'varchar', nullable: false })
  websiteURL: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  mobileNo: string

  @Column({ type: 'varchar', nullable: true, default: null })
  profilePic: string | null

  @OneToMany(() => Campaign, (campaign) => campaign.brand)
  campaign: ICampaign[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}

@Entity()
export class AgencyProfile implements IBrandProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  name: string

  @Column({ type: 'varchar', nullable: false })
  pocFirstName: string

  @Column({ type: 'varchar', nullable: true })
  pocLastName: string

  @OneToOne(() => User, (user) => user.agencyProfile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: IUser

  @Column({ type: 'varchar', nullable: false })
  websiteURL: string

  @Column({ type: 'varchar', nullable: true, default: null })
  profilePic: string | null

  @Column({ type: 'varchar', nullable: false, unique: true })
  mobileNo: string

  @OneToMany(
    () => CampaignParticipants,
    (campaignParticipant) => campaignParticipant.influencerProfile
  )
  campaignParticipant: ICampaignParticipants

  @OneToMany(
    () => PurchaseInvoice,
    (purchaseInvoice) => purchaseInvoice.agencyProfile
  )
  purchaseInvoices: PurchaseInvoice[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
