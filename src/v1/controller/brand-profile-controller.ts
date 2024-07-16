import { BaseController } from '../../utils'
import { IBaseController } from '../../utils/baseController'
import {
  IBrandProfile,
  IBrandProfileService,
} from '../modules/brands/interface'

interface IBrandProfileController extends IBaseController {}

export class BrandProfileController
  extends BaseController<IBrandProfile>
  implements IBrandProfileController
{
  constructor(brandProfileService: IBrandProfileService) {
    super(brandProfileService)
  }
}
