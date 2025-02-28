const request = require('supertest');
const app = require('../src/app');
const { sequelizeMock, Task, User } = require('./dbMock');

describe('Task API', () => {
  let token;

  beforeAll(async () => {
    await sequelizeMock.sync({ force: true }); // Reset DB before tests

    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ username: 'test_user', email: 'test@example.com', password: 'password123' });

    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    token = loginRes.body.token;
  });

  beforeEach(async () => {
    await Task.sync({ force: true }); // Clear DB before each test
  });

  it('should create a task successfully', async () => {
    const response = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'New Task', description: 'This is a test task' });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe('New Task');
  });

  it('should not create a task with missing fields', async () => {
    const response = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: '' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Title is required');
  });

  it('should get all tasks for the user', async () => {
    await Task.create({ title: 'Task 1', description: 'First task', completed: false });

    const response = await request(app)
      .get('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update task status', async () => {
    const task = await Task.create({ title: 'Task to update', description: 'Update test', completed: false });

    const response = await request(app)
      .patch(`/api/v1/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ completed: true });

    expect(response.status).toBe(200);
    expect(response.body.data.completed).toBe(true);
  });
});

