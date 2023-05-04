import { NextFunction, Request, Response } from 'express'
const { getBusiness } = require('../services/business-service')

export interface BusinessRequest extends Request {
  business?: any
}

export const deleteNonBusinessData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedFields = ['numberOfReviews', 'businessId', 'averageRating']

  Object.keys(req.body).forEach((key) => {
    if (allowedFields.includes(key)) {
      delete req.body[key]
    }
  })

  next()
}

export const validateBusinessData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, typeBusiness, website, email, phone, address } = req.body

  if (
    !name ||
    name.length < 0 ||
    name == '' ||
    name == undefined ||
    name == null
  ) {
    return res
      .status(400)
      .json({ errorid: 2, message: 'Name of business must be valid' })
  }

  if (
    !typeBusiness ||
    typeBusiness.length < 0 ||
    typeBusiness == '' ||
    typeBusiness == undefined ||
    typeBusiness == null
  ) {
    return res
      .status(400)
      .json({ errorid: 2, message: 'Type of business must be valid' })
  }

  switch (typeBusiness) {
    case 'online':
      if (name.length > 75) {
        return res.status(400).json({
          errorid: 2,
          message:
            'Business name must be greater than 0 and less than 75 characters.',
        })
      }
      if (
        !website ||
        website.length < 0 ||
        website == '' ||
        website == undefined ||
        website == null
      ) {
        return res
          .status(400)
          .json({ errorid: 2, message: 'Website must be valid' })
      }
      break
    case 'physical':
      if (name.length > 50) {
        return res.status(400).json({
          errorid: 2,
          message:
            'Business name must be greater than 0 and less than 50 characters.',
        })
      }
      if (
        !email ||
        email.length < 0 ||
        email == '' ||
        email == undefined ||
        email == null
      ) {
        return res
          .status(400)
          .json({ errorid: 2, message: 'Email of business must be valid' })
      }
      if (
        !address ||
        address.length < 0 ||
        address == '' ||
        address == undefined ||
        address == null
      ) {
        return res
          .status(400)
          .json({ errorid: 2, message: 'Address must be valid' })
      }
      if (
        !phone ||
        phone.length < 0 ||
        phone == '' ||
        phone == undefined ||
        phone == null
      ) {
        return res
          .status(400)
          .json({ errorid: 2, message: 'Phone must be valid' })
      }
      break
  }

  next()
}

export const validateBusinessExists = async (
  req: BusinessRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const business = await getBusiness(parseInt(req.params.id))
    if (!business) {
      return res.status(400).json({ errorid: 1, message: 'Business not found' })
    }
    req.business = business
    next()
  } catch (error) {
    console.error(error)
    res.status(400).json({ errorid: 2, message: error })
  }
}
