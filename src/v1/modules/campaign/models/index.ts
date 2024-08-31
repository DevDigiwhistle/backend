import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Enum } from '../../../../constants'
import { EmployeeProfile } from '../../admin/models'
import { InfluencerProfile } from '../../influencer/models'
import { AgencyProfile } from '../../brands/models'
import {
  ICampaign,
  ICampaignDeliverables,
  ICampaignParticipants,
} from '../interface'
import { IAgencyProfile } from '../../brands/interface'

@Entity()
export class Campaign implements ICampaign {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  name: string

  @Column({ type: 'varchar', nullable: false })
  code: string

  @Column({ type: 'varchar', nullable: false })
  brandName: string

  @Column({ type: 'date', nullable: false })
  startDate: Date

  @Column({ type: 'date', nullable: false })
  endDate: Date

  @Column({ type: 'float', nullable: false })
  commercial: number

  @Column('simple-array')
  platform: string[]

  @Column({ type: 'text', nullable: true })
  details: string | null

  @Column({ type: 'varchar', nullable: true })
  invoiceNo: string | null

  @Column({
    type: 'enum',
    enum: Enum.CampaignStatus,
    default: Enum.CampaignStatus.PENDING,
  })
  status: Enum.CampaignStatus

  @ManyToOne(
    () => EmployeeProfile,
    (employeeProfile) => employeeProfile.campaignManager
  )
  manager: EmployeeProfile

  @ManyToOne(
    () => EmployeeProfile,
    (employeeProfile) => employeeProfile.campaignIncentives,
    { nullable: true }
  )
  incentiveWinner: EmployeeProfile | null

  @OneToMany(() => CampaignParticipants, (participant) => participant.campaign)
  participants: ICampaignParticipants[]

  @Column({ type: 'float', nullable: true })
  cpv: number | null

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

@Entity()
export class CampaignParticipants implements ICampaignParticipants {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  email: string

  @ManyToOne(
    () => InfluencerProfile,
    (influencerProfile) => influencerProfile.campaignParticipant,
    { nullable: true }
  )
  influencerProfile: InfluencerProfile | null

  @ManyToOne(
    () => AgencyProfile,
    (agencyProfile) => agencyProfile.campaignParticipant,
    { nullable: true }
  )
  agencyProfile: IAgencyProfile | null

  @ManyToOne(() => Campaign, (campaign) => campaign.participants)
  campaign: ICampaign

  @Column({ type: 'float', nullable: true })
  toBePaid: number | null

  @Column({ type: 'float', nullable: true })
  margin: number | null

  @Column({
    type: 'enum',
    enum: Enum.CampaignInvoiceStatus,
    default: Enum.CampaignInvoiceStatus.NOT_GENERATED,
  })
  invoiceStatus: Enum.CampaignInvoiceStatus

  @Column({
    type: 'enum',
    enum: Enum.CampaignPaymentStatus,
    default: Enum.CampaignPaymentStatus.PENDING,
  })
  paymentStatus: Enum.CampaignPaymentStatus

  @OneToMany(
    () => CampaignDeliverables,
    (deliverable) => deliverable.campaignParticipant
  )
  deliverables: ICampaignDeliverables[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

@Entity()
export class CampaignDeliverables implements ICampaignDeliverables {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: true })
  name: string

  @Column({ type: 'text', nullable: true })
  desc: string

  @Column({ type: 'string', enum: Enum.Platform })
  platform: Enum.Platform

  @Column({
    type: 'enum',
    enum: Enum.CampaignDeliverableStatus,
    default: Enum.CampaignDeliverableStatus.NOT_LIVE,
  })
  status: Enum.CampaignDeliverableStatus

  @Column({ type: 'text', nullable: true })
  link: string | null

  @Column({ type: 'float', nullable: true })
  EngagementRate: number | null

  @Column({ type: 'float', nullable: true })
  cpv: number | null

  @Column({ type: 'date', default: new Date() })
  statsUpdatedAt: Date

  @ManyToOne(
    () => CampaignParticipants,
    (participant) => participant.deliverables
  )
  campaignParticipant: ICampaignParticipants

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
