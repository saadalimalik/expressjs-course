import express from 'express';
import dotenv from 'dotenv';
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from 'express-validator';
import { GetUsersByFilterSchema } from './utils/validation/schemas/validationSchemas.mjs';

// Configuring the environment variables on the process
dotenv.config();

// Initialize the application
const app = express();

// Middleware to handle incoming JSON data
app.use(express.json());

const mockUsers = [
  { id: 1, name: 'anthony', displayName: 'Anthony', job: 'developer' },
  { id: 2, name: 'john', displayName: 'John', job: 'project_manager' },
  { id: 3, name: 'emilia', displayName: 'Emilia', job: 'marketing_manager' },
];

// Resolving user id middleware
const resolveIndexByUserId = (request, response, next) => {
  const {
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  request.findUserIndex = findUserIndex;

  next();
};

// Setup routes
app.get('/', (request, response) => {
  response.status(201).json({ msg: 'Welcome to the backend;' });
});

// -User Routes
app.get(
  '/api/users',
  checkSchema(GetUsersByFilterSchema),
  (request, response) => {
    const result = validationResult(request);

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    const { filter, value } = matchedData(request);
    console.log(data);

    if (filter && value) {
      return response.send(
        mockUsers.filter((user) => {
          return user[filter]?.includes(value);
        })
      );
    }

    return response.send(mockUsers);
  }
);

app.post('/api/users', (request, response) => {
  const { body } = request;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };

  mockUsers.push(newUser);
  return response.status(201).send(newUser);
});

app.get('/api/users/:id', resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;

  return response.send(mockUsers[findUserIndex]);
});

app.put('/api/users/:id', resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

app.patch('/api/users/:id', resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

app.delete('/api/users/:id', resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;

  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

// Setup port for the server
const PORT = process.env.PORT || 3000;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
