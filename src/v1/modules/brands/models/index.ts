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

  @Column({ type: 'varchar', nullable: true, default: null })
  msmeNo: string

  @Column({ type: 'varchar', nullable: true, default: null })
  gstNo: string

  @Column({ type: 'varchar', nullable: true, default: null })
  panNo: string

  @Column({ type: 'varchar', nullable: true, default: null })
  aadharNo: string

  @Column({ type: 'varchar', nullable: true, default: null })
  address: string

  @Column({ type: 'varchar', nullable: true, default: null })
  state: string

  @Column({ type: 'varchar', nullable: true, default: null })
  pincode: string

  @Column({ type: 'varchar', nullable: true, default: null })
  city: string

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
    (purchaseInvoice) => purchaseInvoice.agencyProfile,
    { cascade: true }
  )
  purchaseInvoices: PurchaseInvoice[]

  @Column({ type: 'varchar', default: null })
  aadharNo: string

  @Column({ type: 'varchar', default: null })
  panNo: string

  @Column({ type: 'varchar', default: null })
  gstNo: string

  @Column({ type: 'varchar', default: null })
  msmeNo: string

  @Column({ type: 'varchar', default: null })
  bankName: string

  @Column({ type: 'varchar', default: null })
  bankAccountNumber: string

  @Column({ type: 'varchar', default: null })
  bankIfscCode: string

  @Column({ type: 'varchar', default: null })
  bankAccountHolderName: string

  @Column({ type: 'varchar', default: null })
  address: string

  @Column({ type: 'varchar', default: null })
  city: string

  @Column({ type: 'varchar', default: null })
  state: string

  @Column({ type: 'varchar', default: null })
  pincode: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
