export const GetUsersByFilterSchema = {
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
