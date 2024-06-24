import Ajv, { type Schema } from 'ajv'
import HttpException from './HttpException'
import { Enum } from '../constants'
import {Request,Response,NextFunction} from 'express'

export class BaseValidator {
  private readonly schemaObj: Schema

  constructor(schemaObj: Schema) {
    this.schemaObj = schemaObj
  }

  public async validateInput(req: Request,res: Response,next: NextFunction): Promise<void> {
    try {
      const ajv = new Ajv()

      const validate = ajv.compile(this.schemaObj)
      const valid = validate(req.body)
      
      if(valid) next()
      else{
        const validationError = validate.errors?.map((message) => {
          return message.message ?? ''
        })

        let validationResponse: string = 'Schema is invalid'

        if (validationError !== undefined) {
          validationResponse = validationError.join(',')
        }

        throw new HttpException(
          Enum.RESPONSE_CODES.BAD_REQUEST,
          validationResponse
        )
      }
    } catch (e: any) {
      res.status(e?.errorCode).json(e?.message)
    }
  }
}
