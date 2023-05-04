import { Response } from 'express'
import { BusinessRequest } from '../middleware/validate-business'
const { storeReview, getReviews } = require('../services/review-service')

module.exports.getReviews = async (req: BusinessRequest, res: Response) => {
  try {
    const { page, limit } = req.query
    const resultReviews = await getReviews(req.business._id, page, limit)
    res.status(200).json({
      id: req.business._id,
      reviews: resultReviews.reviews,
      totalPages: resultReviews.totalPages,
      currentPage: resultReviews.currentPage,
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({ errorid: 2, message: error })
  }
}

module.exports.postReviews = async (req: BusinessRequest, res: Response) => {
  try {
    const newReview = await storeReview(req)
    res.status(201).json({ review: newReview })
  } catch (error) {
    console.error(error)
    res.status(400).json({ errorid: 2, message: error })
  }
}
