import mongoose, { Document, Schema } from 'mongoose'
interface IReview extends Document {
  reviewText: string
  rating: number
  userName: string
  businessId: mongoose.Schema.Types.ObjectId
}

const reviewSchema: Schema = new mongoose.Schema(
  {
    reviewText: {
      type: String,
      required: true,
      maxlength: 500,
      minlength: 20,
    },
    rating: {
      type: Number,
      required: true,
      max: 5,
      min: 1,
    },
    userName: {
      type: String,
      required: true,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'business',
    },
    created: { type: Date, default: Date.now },
  },
  { collection: 'reviews', versionKey: false }
)

const Review = mongoose.model<IReview>('reviews', reviewSchema)

export { Review }
