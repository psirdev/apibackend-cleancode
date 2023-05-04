import { NextFunction, Request, Response } from 'express'

export const validateReviewData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reviewText, rating, userName } = req.body

  if (
    reviewText.length < 20 ||
    reviewText.length > 500 ||
    reviewText == '' ||
    reviewText == undefined ||
    reviewText == null
  ) {
    return res.status(400).json({
      errorid: 2,
      message: 'Review text must be between 20 and 500 characters',
    })
  }

  if (
    rating < 0 ||
    rating > 5 ||
    !Number.isInteger(rating) ||
    Number.isNaN(rating)
  ) {
    return res.status(400).json({
      errorid: 2,
      message: 'Rating must be a valid number between 1 and 5',
    })
  }

  if (
    userName.length < 0 ||
    userName == '' ||
    userName == undefined ||
    userName == null
  ) {
    return res
      .status(400)
      .json({ errorid: 2, message: 'Review text must be valid' })
  }

  next()
}

export const validatePageAndLimitValids = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.query.page) {
      let pageParsed = parseInt(req.query.page as string)
      if (pageParsed < 0) {
        throw new Error('Page must be a valid number')
      }
    }

    if (req.query.limit) {
      let limitParsed = parseInt(req.query.limit as string)
      if (limitParsed < 0 || limitParsed > 100) {
        throw new Error('Limit must be lower than 100')
      }
    }
  } catch (error) {
    console.error(error)
    return res.status(400).json({ errorid: 2, message: (<Error>error).message })
  }
  next()
}
