import mongoose from 'mongoose'
import { Business } from '../models/business-model'
import { Review } from '../models/review-model'

module.exports.storeReview = async (reqBody: any) => {
  let businessId = reqBody.business._id
  const newReview = new Review({ businessId, ...reqBody.body })
  await newReview.save()

  if (businessId) {
    const reviews = await Review.find({ businessId })
    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    await Business.findByIdAndUpdate(businessId, {
      numberOfReviews: reviews.length,
      averageRating: avgRating.toFixed(1),
    })
  }
  return newReview
}

module.exports.getReviews = async (
  businessId: typeof mongoose.Schema.Types.ObjectId,
  page: number = 1,
  limit: number = 5
) => {
  const startIndex = (page - 1) * limit
  const count = await Review.countDocuments({ businessId })
  const reviews = await Review.find({ businessId })
    .skip(startIndex)
    .limit(limit)

  const result = {
    reviews,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  }

  return result
}
