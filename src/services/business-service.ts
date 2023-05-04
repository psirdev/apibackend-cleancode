import {
  Business,
  OnlineBusiness,
  PhysicalBusiness,
} from '../models/business-model'

module.exports.storeBusiness = (reqBody: any, callback: Function) => {
  const { typeBusiness } = reqBody

  let businessObj

  switch (typeBusiness) {
    case 'online':
      businessObj = new OnlineBusiness(reqBody)
      break
    case 'physical':
      businessObj = new PhysicalBusiness(reqBody)
      break
    default:
      return callback(new Error('Invalid business type'))
  }

  businessObj
    .save()
    .then(async function (savedData) {
      return callback(savedData, null)
    })
    .catch(function (err) {
      return callback(null, err)
    })
}

module.exports.getBusiness = async (businessId: Number) => {
  return Business.findOne({ businessId })
}
