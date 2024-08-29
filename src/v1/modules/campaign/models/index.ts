// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   OneToMany,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from 'typeorm'
// import { Enum } from '../../../../constants'
// import { EmployeeProfile } from '../../admin/models'
// import { InfluencerProfile } from '../../influencer/models'
// import { IEmployeeProfile } from '../../admin/interface'
// import { ICampaign, ICampaignParticipants } from '../interface'
// import { IInfluencerProfile } from '../../influencer/interface'

// @Entity()
// export class Campaign implements ICampaign {
//   @PrimaryGeneratedColumn('uuid')
//   id: string

//   @Column()
//   name: string

//   @Column()
//   code: string

//   @Column()
//   brandName: string

//   @Column({ type: 'date' })
//   startDate: Date

//   @Column({ type: 'date' })
//   endDate: Date

//   @Column({ type: 'float' })
//   commercial: number

//   @Column('simple-array')
//   platform: string[]

//   @Column({ type: 'text' })
//   details: string

//   @Column({ type: 'enum', enum: Enum.CampaignStatus })
//   status: Enum.CampaignStatus

//   @ManyToOne(() => EmployeeProfile)
//   manager: IEmployeeProfile

//   @ManyToOne(() => EmployeeProfile, { nullable: true })
//   incentiveWinner: IEmployeeProfile | null

//   @OneToMany(() => CampaignParticipants, (participant) => participant.campaign)
//   participants: ICampaignParticipants[]

//   @Column({ type: 'float', nullable: true })
//   cpv: number | null

//   @CreateDateColumn()
//   createdAt: Date

//   @UpdateDateColumn()
//   updatedAt: Date
// }

// @Entity()
// export class CampaignParticipants implements ICampaignParticipants {
//   @PrimaryGeneratedColumn('uuid')
//   id: string

//   @Column()
//   email: string

//   @ManyToOne(() => InfluencerProfile)
//   profile: IInfluencerProfile

//   @ManyToOne(() => Campaign, (campaign) => campaign.participants)
//   campaign: Campaign

//   @Column()
//   deliverable: string

//   @Column()
//   platform: string

//   @Column({ type: 'float', nullable: true })
//   toBePaid: number | null

//   @Column()
//   paymentStatus: string

//   @Column({ type: 'varchar', nullable: true })
//   invoiceStatus: string | null

//   @Column({ type: 'float', nullable: true })
//   margin: number | null

//   @OneToMany(
//     () => CampaignDeliverables,
//     (deliverable) => deliverable.campaignParticipant
//   )
//   deliverables: CampaignDeliverables[]

//   @CreateDateColumn()
//   createdAt: Date

//   @UpdateDateColumn()
//   updatedAt: Date
// }

// @Entity()
// export class CampaignDeliverables {
//   @PrimaryGeneratedColumn('uuid')
//   id: string

//   @Column({ type: 'text' })
//   desc: string

//   @Column()
//   platform: string

//   @Column()
//   status: string

//   @Column({ type: 'text' })
//   link: string

//   @Column({ type: 'float', nullable: true })
//   EngagementRate: number

//   @Column({ type: 'float', nullable: true })
//   cpv: number

//   @Column({ type: 'date' })
//   statsUpdatedAt: Date

//   @ManyToOne(
//     () => CampaignParticipants,
//     (participant) => participant.deliverables
//   )
//   campaignParticipant: CampaignParticipants

//   @CreateDateColumn()
//   createdAt: Date

//   @UpdateDateColumn()
//   updatedAt: Date
// }
