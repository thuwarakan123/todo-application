const request = require('supertest');
const app = require('../src/app');
const { sequelizeMock, User } = require('./dbMock');

describe('Authentication API', () => {
  beforeAll(async () => {
    await sequelizeMock.sync({ force: true }); // Ensure test DB resets before tests
  });

  beforeEach(async () => {
    await User.sync({ force: true }); // Reset user data before each test
  });

  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register') // Ensure correct endpoint
      .send({ username: 'test_user', email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should log in successfully with correct credentials', async () => {
    await User.create({ username: 'test_user', email: 'test@example.com', password: 'password123' });

    const response = await request(app)
      .post('/api/v1/auth/login') // Ensure correct endpoint
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return error for invalid login credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email or password');
  });
});
