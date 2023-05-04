import request from 'supertest'
import crypto from 'crypto'

import app from '../../src/app'

describe('Business Endpoint', () => {
  test('should post a business with id 1 (online)', async () => {
    const response = await request(app)
      .post('/business/')
      .send({
        typeBusiness: 'online',
        name: 'Sample Shop Online',
        email: 'user@sample.com',
        website: 'https://sample.com',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    expect(response.statusCode).toEqual(201)
  })

  test('should GET a business detail with id 1 (online)', async () => {
    const res = await request(app).get('/business/1')
    expect(res.body.business.businessId).toEqual(1)
    expect(res.body.business.typeBusiness).toEqual('online')
    expect(res.body.business.name).toEqual('Sample Shop Online')
    expect(res.body.business.website).toEqual('https://sample.com')
    expect(res.body.business.email).toEqual('user@sample.com')
    expect(res.body.business.numberOfReviews).toEqual(0)
    expect(res.body.business.averageRating).toEqual(0)
  })

  test('should post a business with id 2 (physical)', async () => {
    const response = await request(app)
      .post('/business/')
      .send({
        typeBusiness: 'physical',
        name: 'Sample Shop Physical',
        email: 'physical@sample.com',
        phone: '666 11 22',
        address: 'Fake Street 123',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    expect(response.statusCode).toEqual(201)
  })

  test('should get a response detail information of business with id 2 (physical)', async () => {
    const res = await request(app).get('/business/2')
    expect(res.body.business.businessId).toEqual(2)
    expect(res.body.business.typeBusiness).toEqual('physical')
    expect(res.body.business.name).toEqual('Sample Shop Physical')
    expect(res.body.business.phone).toEqual('666 11 22')
    expect(res.body.business.email).toEqual('physical@sample.com')
    expect(res.body.business.address).toEqual('Fake Street 123')
    expect(res.body.business.numberOfReviews).toEqual(0)
    expect(res.body.business.averageRating).toEqual(0)
  })

  test('should fail posting business due to limitation of name (75 char for online)', async () => {
    const response = await request(app)
      .post('/business/')
      .send({
        typeBusiness: 'online',
        name: crypto.randomBytes(76).toString('hex'),
        email: 'user@sample.com',
        website: 'https://sample.com',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    expect(response.statusCode).toEqual(400)
    expect(response.body.errorid).toEqual(2)
    expect(response.body.message).toEqual(
      'Business name must be greater than 0 and less than 75 characters.'
    )
  })

  test('should fail posting business due to limitation of name (51 char for physical)', async () => {
    const response = await request(app)
      .post('/business/')
      .send({
        typeBusiness: 'physical',
        name: crypto.randomBytes(51).toString('hex'),
        email: 'user@sample.com',
        address: 'https://sample.com',
        phone: '666 11 22',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    expect(response.statusCode).toEqual(400)
    expect(response.body.errorid).toEqual(2)
    expect(response.body.message).toEqual(
      'Business name must be greater than 0 and less than 50 characters.'
    )
  })
})

describe('Reviews Endpoint', () => {
  test('should store a review ok', async () => {
    const res = await request(app)
      .post('/business/1/reviews')
      .send({
        reviewText: 'this shop is amazing and beautiful',
        rating: 5,
        userName: 'user',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
    expect(res.body.review.reviewText).toEqual(
      'this shop is amazing and beautiful'
    )
    expect(res.body.review.rating).toEqual(5)
    expect(res.body.review.userName).toEqual('user')
  })

  test('should get the reviews of a business with id 1 (online)', async () => {
    const res = await request(app).get('/business/1/reviews')
    for (let review of res.body.reviews) {
      expect(review.reviewText).toEqual('this shop is amazing and beautiful')
      expect(review.rating).toEqual(5)
      expect(review.userName).toEqual('user')
    }
  })

  test('should fail posting review due to limitation of text (min 20)', async () => {
    const res = await request(app)
      .post('/business/1/reviews')
      .send({
        reviewText: 'test',
        rating: 5,
        userName: 'user',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
    expect(res.statusCode).toEqual(400)
    expect(res.body.errorid).toEqual(2)
    expect(res.body.message).toEqual(
      'Review text must be between 20 and 500 characters'
    )
  })

  test('should fail posting review due to limitation of text (max 500)', async () => {
    const res = await request(app)
      .post('/business/1/reviews')
      .send({
        reviewText: crypto.randomBytes(600).toString('hex'),
        rating: 5,
        userName: 'user',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
    expect(res.statusCode).toEqual(400)
    expect(res.body.errorid).toEqual(2)
    expect(res.body.message).toEqual(
      'Review text must be between 20 and 500 characters'
    )
  })

  test('should fail posting review due to limitation of rating', async () => {
    const res = await request(app)
      .post('/business/1/reviews')
      .send({
        reviewText: crypto.randomBytes(250).toString('hex'),
        rating: 6,
        userName: 'user',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
    expect(res.statusCode).toEqual(400)
    expect(res.body.errorid).toEqual(2)
    expect(res.body.message).toEqual(
      'Rating must be a valid number between 1 and 5'
    )
  })

  test('should fail posting review due to limitation of rating decimal', async () => {
    const res = await request(app)
      .post('/business/1/reviews')
      .send({
        reviewText: crypto.randomBytes(250).toString('hex'),
        rating: 6.566666666666,
        userName: 'user',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
    expect(res.statusCode).toEqual(400)
    expect(res.body.errorid).toEqual(2)
    expect(res.body.message).toEqual(
      'Rating must be a valid number between 1 and 5'
    )
  })
})
