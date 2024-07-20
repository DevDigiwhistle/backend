import { CRUDBase } from '../../../../utils'
import { type IVerification } from '../interface'
import { IVerificationCRUD } from '../interface'
import { EntityTarget } from 'typeorm'

export class VerificationCRUD
  extends CRUDBase<IVerification>
  implements IVerificationCRUD
{
  private static instance: IVerificationCRUD | null = null

  static getInstance(
    verification: EntityTarget<IVerification>
  ): IVerificationCRUD {
    if (VerificationCRUD.instance === null) {
      VerificationCRUD.instance = new VerificationCRUD(verification)
    }
    return VerificationCRUD.instance
  }

  private constructor(verification: EntityTarget<IVerification>) {
    super(verification)
  }
}
