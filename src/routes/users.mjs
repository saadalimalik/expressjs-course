import { Router } from 'express';
import { validationResult, checkSchema, matchedData } from 'express-validator';
import { mockUsers } from '../utils/constants.mjs';
import resolveIndexByUserId from '../middlewares/resolveIndexByUserId.mjs';
import {
  CreateUserValidationSchema,
  GetUsersValidationSchema,
} from '../utils/validation/schemas/validationSchemas.mjs';

const router = Router();

// -User Routes
router.get('/', checkSchema(GetUsersValidationSchema), (request, response) => {
  const result = validationResult(request);

  if (!result.isEmpty())
    return response.status(400).send({ errors: result.array() });

  const { filter, value } = matchedData(request);

  if (filter && value) {
    return response.send(
      mockUsers.filter((user) => {
        return user[filter]?.includes(value);
      })
    );
  }

  return response.send(mockUsers);
});

router.post(
  '/',
  checkSchema(CreateUserValidationSchema),
  (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };

    mockUsers.push(newUser);
    return response.status(201).send(newUser);
  }
);

router.get('/:id', resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;

  return response.send(mockUsers[findUserIndex]);
});

router.put('/:id', resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

router.patch('/:id', resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

router.delete('/:id', resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;

  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

export default router;
