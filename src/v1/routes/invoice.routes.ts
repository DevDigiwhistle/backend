import { Router } from 'express'
import { SaleInvoiceController } from '../controller/sale-invoice-controller'
import { PurchaseInvoiceController } from '../controller/purchase-invoice-controller'
import { purchaseInvoiceService, saleInvoiceService } from '../modules/invoice'
import {
  addPurchaseInvoiceSchema,
  addSaleInvoiceSchema,
  shareInvoiceSchema,
  updatePurchaseInvoiceSchema,
  updateSaleInvoiceSchema,
} from '../modules/invoice/validators'
import { BaseValidator } from '../../utils'
import { authorizeUser, verifyToken } from '../middleware'
import { Enum } from '../../constants'
import { userService } from '../modules/user'

const invoiceRouter = Router()

const purchaseInvoiceController = new PurchaseInvoiceController(
  purchaseInvoiceService,
  userService
)

const saleInvoiceController = new SaleInvoiceController(saleInvoiceService)

const addSaleInvoiceValidator = new BaseValidator(addSaleInvoiceSchema)

const updateSaleInvoiceValidator = new BaseValidator(updateSaleInvoiceSchema)

const addPurchaseInvoiceValidator = new BaseValidator(addPurchaseInvoiceSchema)

const updatePurchaseInvoiceValidator = new BaseValidator(
  updatePurchaseInvoiceSchema
)

const shareInvoiceValidator = new BaseValidator(shareInvoiceSchema)

invoiceRouter.post(
  '/sale',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  addSaleInvoiceValidator.validateInput.bind(addSaleInvoiceValidator),
  saleInvoiceController.addController.bind(saleInvoiceController)
)

invoiceRouter.delete(
  '/sale/:id',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  saleInvoiceController.deleteController.bind(saleInvoiceController)
)

invoiceRouter.patch(
  '/sale/:id',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  updateSaleInvoiceValidator.validateInput.bind(updateSaleInvoiceValidator),
  saleInvoiceController.updateController.bind(saleInvoiceController)
)

invoiceRouter.get(
  '/sale',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  saleInvoiceController.getAllController.bind(saleInvoiceController)
)

invoiceRouter.post(
  '/sale/share',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  shareInvoiceValidator.validateInput.bind(shareInvoiceValidator),
  saleInvoiceController.shareInvoiceController.bind(saleInvoiceController)
)

invoiceRouter.get(
  '/sale/download',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  saleInvoiceController.downloadSaleInvoiceController.bind(
    saleInvoiceController
  )
)

invoiceRouter.post(
  '/sale/download',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  saleInvoiceController.downloadSaleInvoiceController.bind(
    saleInvoiceController
  )
)

invoiceRouter.post(
  '/purchase',
  verifyToken,
  authorizeUser([
    Enum.ROLES.ADMIN,
    Enum.ROLES.EMPLOYEE,
    Enum.ROLES.INFLUENCER,
    Enum.ROLES.AGENCY,
  ]),
  addPurchaseInvoiceValidator.validateInput.bind(addPurchaseInvoiceValidator),
  purchaseInvoiceController.addController.bind(purchaseInvoiceController)
)

invoiceRouter.delete(
  '/purchase/:id',
  verifyToken,
  authorizeUser([Enum.ROLES.INFLUENCER, Enum.ROLES.AGENCY]),
  purchaseInvoiceController.deleteController.bind(purchaseInvoiceController)
)

invoiceRouter.patch(
  '/purchase/:id',
  verifyToken,
  authorizeUser([
    Enum.ROLES.ADMIN,
    Enum.ROLES.EMPLOYEE,
    Enum.ROLES.INFLUENCER,
    Enum.ROLES.AGENCY,
  ]),
  updatePurchaseInvoiceValidator.validateInput.bind(
    updatePurchaseInvoiceValidator
  ),
  purchaseInvoiceController.updateController.bind(purchaseInvoiceController)
)

invoiceRouter.get(
  '/purchase',
  verifyToken,
  authorizeUser([
    Enum.ROLES.ADMIN,
    Enum.ROLES.EMPLOYEE,
    Enum.ROLES.INFLUENCER,
    Enum.ROLES.AGENCY,
  ]),
  purchaseInvoiceController.getAllController.bind(purchaseInvoiceController)
)

invoiceRouter.post(
  '/purchase/share',
  verifyToken,
  authorizeUser([
    Enum.ROLES.ADMIN,
    Enum.ROLES.EMPLOYEE,
    Enum.ROLES.INFLUENCER,
    Enum.ROLES.AGENCY,
  ]),
  shareInvoiceValidator.validateInput.bind(shareInvoiceValidator),
  purchaseInvoiceController.shareInvoiceController.bind(
    purchaseInvoiceController
  )
)

invoiceRouter.post(
  '/purchase/download',
  verifyToken,
  authorizeUser([
    Enum.ROLES.ADMIN,
    Enum.ROLES.EMPLOYEE,
    Enum.ROLES.INFLUENCER,
    Enum.ROLES.AGENCY,
  ]),
  purchaseInvoiceController.downloadPurchaseInvoiceReportController.bind(
    purchaseInvoiceController
  )
)

export default invoiceRouter
