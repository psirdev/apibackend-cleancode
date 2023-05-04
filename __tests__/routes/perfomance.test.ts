import request from 'supertest'

import app from '../../src/app'

describe('Business Endpoint', () => {
  test('should post 1000 business', async () => {
    for (let i = 0; i < 1000; i++) {
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
    }
  }, 90000)

  test('should GET a business detail with id 873', async () => {
    const res = await request(app).get('/business/873')
    expect(res.body.business.businessId).toEqual(873)
  }, 90000)
})

describe('Reviews Endpoint', () => {
  test('should post 2000 reviews on business 500 ok', async () => {
    for (let i = 0; i < 2000; i++) {
      const res = await request(app)
        .post('/business/500/reviews')
        .send({
          reviewText: 'this shop is amazing and beautiful',
          rating: 5,
          userName: 'user',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
      expect(res.statusCode).toEqual(201)
    }
  }, 90000)

  test('should get the total pages of business 500', async () => {
    const res = await request(app).get('/business/500/reviews?limit=5&page=1')
    expect(res.body.totalPages).toBeGreaterThan(50)
  }, 90000)
})
