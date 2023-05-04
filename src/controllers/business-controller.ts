import { Request, Response } from 'express'
import { BusinessRequest } from '../middleware/validate-business'

const { storeBusiness } = require('../services/business-service')

module.exports.getBusiness = async (req: BusinessRequest, res: Response) => {
  try {
    res.status(200).json({ business: req.business })
  } catch (error) {
    console.error(error)
    res.status(400).json({ errorid: 2, message: error })
  }
}

module.exports.postBusiness = async (req: Request, res: Response) => {
  try {
    await storeBusiness(req.body, function (savedData: any, err: any) {
      if (err) {
        throw new Error(err)
      } else {
        res.status(201).json({
          business: savedData,
        })
      }
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({ errorid: 2, message: (<Error>error).message })
  }
}
