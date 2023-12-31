import app from 'app';
import { StatusCodes } from 'http-status-codes';
import supertest from 'supertest';
import prismaMock from 'test/prismaMock';
import { token } from 'test/setup';

describe('pig', () => {
  const pigData = {
    style: null,
    id: '652aa067af2b8ebd0748e306',
    name: 'Tiền ăn uống',
    updatedAt: '2023-10-14T14:06:31.460Z' as unknown as Date,
    createdAt: '2023-10-14T14:06:31.460Z' as unknown as Date,
    userId: '651e94ef813f47c9080f71b7',
    user: {
      id: '651e94ef813f47c9080f71b7',
      email: 'lekienlan98@gmail.com',
      firstName: 'Lân',
      lastName: 'Lê',
      updatedAt: '2023-10-05T10:50:23.101Z' as unknown as Date,
      createdAt: '2023-10-05T10:50:23.101Z' as unknown as Date
    },
    pigs: [
      {
        id: '6533f8fcf69468807254b754',
        budget: 40000,
        endDate: '2023-10-25T00:00:00.000Z' as unknown as Date,
        expense: -2730000,
        members: ['651e94ef813f47c9080f71b7'],
        repeat: true,
        startDate: '2023-10-21T00:00:00.000Z',
        updatedAt: '2023-11-09T16:19:30.915Z' as unknown as Date,
        createdAt: '2023-10-21T16:14:52.504Z' as unknown as Date,
        pigId: '652aa067af2b8ebd0748e306'
      }
    ]
  };
  describe('GET /v1/piggies', () => {
    it('should return list of pig if data is ok', async () => {
      const fakeResp = {
        limit: 10,
        page: 1,
        results: [pigData],
        totalPages: 1
      };
      prismaMock.pigs.findMany.mockResolvedValue(fakeResp.results);

      // Use supertest to send a request to the create endpoint
      const response = await supertest(app)
        .get('/v1/piggies')
        .set('Authorization', `Bearer ${token}`);
      // Assert the response status code and data
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(fakeResp);
    });
  });
  describe('POST /v1/piggies', () => {
    it('should create pig if data is ok', async () => {
      // Mock the categoryService.create method to resolve with a sample category

      prismaMock.pigs.create.mockResolvedValue(pigData);

      // Use supertest to send a request to the create endpoint
      prismaMock.users.findFirst.mockResolvedValue({
        id: '651e94ef813f47c9080f71b7',
        email: 'lekienlan98@gmail.com',
        firstName: 'Lân',
        lastName: 'Lê',
        updatedAt: new Date().toISOString() as unknown as Date,
        createdAt: new Date().toISOString() as unknown as Date
      });

      const response = await supertest(app)
        .post('/v1/piggies')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Tiền nhà'
        });

      // Assert the response status code and data
      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body).toEqual(pigData);
    });
    it('should fail to create pig if user not found', async () => {
      const response = await supertest(app)
        .post('/v1/piggies')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Tiền nhà'
        });

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.message).toBe('User not found');
    });
    it('should fail to create pig if name is not provided', async () => {
      const response = await supertest(app)
        .post('/v1/piggies')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe('"name" is required');
    });
  });
  describe('PUT /v1/piggies/:id', () => {
    it('should update pig if data is ok', async () => {
      // Mock the pigService.update method to resolve with a sample pig
      prismaMock.pigs.update.mockResolvedValue(pigData);

      const response = await supertest(app)
        .put(`/v1/piggies/123`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          // Provide updated data for the pig
          name: 'Tiền shopping'
        });

      // Assert the response status code and data
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(pigData);
    });

    it('should fail to update pig if pig not found', async () => {
      // Mock the pigService.update method to reject with an error

      const response = await supertest(app)
        .put('/v1/piggies/nonexistent-id')
        .set('Authorization', `Bearer ${token}`)
        .send({
          // Provide updated data for the pig
          name: 'Tiền shopping'
        });

      // Assert the response status code and error message
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.message).toBe('Pig not found');
    });
  });

  describe('DELETE /v1/piggies/:id', () => {
    it('should remove a pig and return it in the response', async () => {
      prismaMock.pigs.delete.mockResolvedValue(pigData);

      const response = await supertest(app)
        .delete(`/v1/piggies/123`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(StatusCodes.OK);
    });
    it('should throw error if pig not found', async () => {
      const response = await supertest(app)
        .delete(`/v1/piggies/123`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.body.message).toBe('Pig not found');
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
