import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IPurchaseInvoice, ISaleInvoice } from '../interface'
import { ICampaign } from '../../campaign/interface'
import { Campaign } from '../../campaign/models'
import { Enum } from '../../../../constants'
import { InfluencerProfile } from '../../influencer/models'
import { IInfluencerProfile } from '../../influencer/interface'
import { AgencyProfile } from '../../brands/models'
import { IAgencyProfile } from '../../brands/interface'

@Entity()
export class SaleInvoice implements ISaleInvoice {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => Campaign, (campaign) => campaign.saleInvoices, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  campaign!: ICampaign

  @Column({ nullable: false, type: 'varchar' })
  gstTin!: string

  @Column({ nullable: false, type: 'varchar' })
  invoiceNo!: string

  @Column({ nullable: false, type: 'date' })
  invoiceDate!: Date

  @Column({ nullable: false })
  amount!: number

  @Column({ nullable: false })
  sgst!: number

  @Column({ nullable: false })
  cgst!: number

  @Column({ nullable: false })
  igst!: number

  @Column({ nullable: false })
  total!: number

  @Column({ nullable: false })
  tds!: number

  @Column({ nullable: false })
  received!: number

  @Column({ nullable: false })
  balanceAmount!: number

  @Column({ nullable: false, type: 'varchar' })
  month!: string

  @Column('enum', { enum: Enum.InvoiceStatus })
  paymentStatus!: Enum.InvoiceStatus

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

@Entity()
export class PurchaseInvoice implements IPurchaseInvoice {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => Campaign, (campaign) => campaign.purchaseInvoices, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  campaign!: ICampaign

  @Column({ nullable: false })
  invoiceNo!: string

  @Column({ nullable: false })
  pan!: string

  @Column({ nullable: false })
  amount!: number

  @Column({ nullable: false })
  igst!: number

  @Column({ nullable: false })
  cgst!: number

  @Column({ nullable: false })
  sgst!: number

  @Column({ nullable: false })
  totalAmount!: number

  @Column({ nullable: false })
  tds!: number

  @Column({ nullable: false })
  tdsPercentage!: number

  @Column({ nullable: false, type: 'varchar' })
  tdsSection: string

  @Column({ nullable: false })
  finalAmount!: number

  @Column({ nullable: false })
  amountToBeReceived!: number

  @Column({ nullable: false })
  balanceAmount: number

  @Column({ type: 'enum', enum: Enum.PaymentTerms, nullable: false })
  paymentTerms!: Enum.PaymentTerms

  @Column('enum', { enum: Enum.InvoiceStatus })
  paymentStatus!: Enum.InvoiceStatus

  @Column({ nullable: true, type: 'varchar' })
  file!: string | null

  @ManyToOne(
    () => InfluencerProfile,
    (influencerProfile) => influencerProfile.purchaseInvoices,
    { nullable: true, eager: true }
  )
  influencerProfile?: IInfluencerProfile | null

  @ManyToOne(
    () => AgencyProfile,
    (agencyProfile) => agencyProfile.purchaseInvoices,
    { nullable: true, eager: true }
  )
  agencyProfile?: IAgencyProfile | null

  @Column({ nullable: false, type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  invoiceDate!: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
