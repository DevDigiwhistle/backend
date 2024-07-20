import { BaseService } from '../../../../utils'
import { IVerification, IVerificationService } from '../interface'
import { IVerificationCRUD } from '../interface'

class VerificationService
  extends BaseService<IVerification, IVerificationCRUD>
  implements IVerificationService
{
  private static instance: IVerificationService | null = null

  static getInstance(
    verificationCRUD: IVerificationCRUD
  ): IVerificationService {
    if (VerificationService.instance === null) {
      VerificationService.instance = new VerificationService(verificationCRUD)
    }
    return VerificationService.instance
  }

  private constructor(verificationCRUD: IVerificationCRUD) {
    super(verificationCRUD)
  }
}
export { VerificationService }
