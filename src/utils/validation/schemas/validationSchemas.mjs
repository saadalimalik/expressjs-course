export const GetUsersValidationSchema = {
  filter: {
    notEmpty: {
      errorMessage: 'Filter cannot be empty.',
    },
    isString: {
      errorMessage: 'Filter name must be string.',
    },
    isLength: {
      options: {
        min: 4,
        max: 12,
      },
      errorMessage: 'Filter name must be between 4 and 12 characters long.',
    },
  },
  value: {
    notEmpty: {
      errorMessage: 'Filter value cannot be empty.',
    },
    isString: {
      errorMessage: 'Filter value must be string.',
    },
  },
};

export const CreateUserValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: 'Name must not be empty.',
    },
    isString: {
      errorMessage: 'Name must be a string.',
    },
    isLength: {
      options: {
        min: 2,
        max: 12,
      },
      errorMessage: 'Name must be between 2 and 32 characters long.',
    },
  },
  displayName: {
    notEmpty: {
      errorMessage: 'Display Name must not be empty.',
    },
    isString: {
      errorMessage: 'Display Name must be a string.',
    },
    isLength: {
      options: {
        min: 2,
        max: 12,
      },
      errorMessage: 'Display Name must be between 2 and 32 characters long.',
    },
  },
  job: {
    notEmpty: {
      errorMessage: 'Job must not be empty.',
    },
    isString: {
      errorMessage: 'Job must be a string.',
    },
    isLength: {
      options: {
        min: 2,
        max: 12,
      },
      errorMessage: 'Job must be between 2 and 32 characters long.',
    },
  },
};
