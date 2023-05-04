import { Router } from 'express'
import {
  deleteNonBusinessData,
  validateBusinessData,
  validateBusinessExists,
} from '../middleware/validate-business'
import {
  validatePageAndLimitValids,
  validateReviewData,
} from '../middleware/validate-reviews'

const {
  getBusiness,
  postBusiness,
} = require('../controllers/business-controller')
const { getReviews, postReviews } = require('../controllers/review-controller')

const router = Router()

router.get('/:id', [validateBusinessExists], getBusiness)
router.post('/', [deleteNonBusinessData, validateBusinessData], postBusiness)
router.get(
  '/:id/reviews',
  [validateBusinessExists, validatePageAndLimitValids],
  getReviews
)
router.post(
  '/:id/reviews',
  [validateBusinessExists, validateReviewData],
  postReviews
)

export { router }
