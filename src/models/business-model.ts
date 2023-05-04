import mongoose, { Document, Model } from 'mongoose'

interface IBusiness extends Document {
  businessId: number
  typeBusiness: string
  name: string
  email: string
  numberOfReviews: number
  averageRating: number
}

interface IPhysicalBusiness extends IBusiness {
  address: string
  phone: string
}

interface IOnlineBusiness extends IBusiness {
  website: string
}

const businessSchema = new mongoose.Schema(
  {
    businessId: { type: Number, unique: true },
    typeBusiness: {
      type: String,
      required: true,
      enum: ['physical', 'online'],
    },
    email: {
      type: String,
      required: true,
      minlength: 1,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0.0,
    },
  },
  {
    discriminatorKey: 'typeBusiness',
    collection: 'business',
    versionKey: false,
  }
)

businessSchema.pre<IBusiness>('save', async function (next) {
  const doc = this
  const maxBusiness = await Business.findOne<IBusiness>(
    {},
    {},
    { sort: { businessId: -1 } }
  ).exec()
  if (!maxBusiness) {
    doc.businessId = 1
  } else {
    doc.businessId = maxBusiness.businessId + 1
  }
  next()
})

const Business: Model<IBusiness> = mongoose.model<IBusiness>(
  'Business',
  businessSchema
)

const physicalBusinessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 1,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
)

const PhysicalBusiness = Business.discriminator<IPhysicalBusiness>(
  'physical',
  physicalBusinessSchema
)

const onlineBusinessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 75,
      minlength: 1,
    },
    website: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
)

const OnlineBusiness = Business.discriminator<IOnlineBusiness>(
  'online',
  onlineBusinessSchema
)

export { Business, PhysicalBusiness, OnlineBusiness }
