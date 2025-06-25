import * as Yup from 'yup';

export const EditUserSchema = Yup.object({
  name: Yup.string().required('Name must not be empty.'),
  email: Yup.string().required('Email must not be empty.'),
  role: Yup.string().required('Role must not be empty.'),
  status: Yup.string().required('Status must not be empty.'),
  positionId: Yup.string().required('Position must not be empty.'),
  regionIds: Yup.array()
    .of(Yup.string().required())
    .when('role', {
      is: 'SAM',
      then: (schema) => schema.required().min(1, 'Region must not be empty'),
      otherwise: (schema) => schema.notRequired(),
    }),

  territoryIds: Yup.array()
    .of(Yup.string().required())
    .when('role', {
      is: 'SAM',
      then: (schema) => schema.required().min(1, 'Territory must not be empty'),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const CreateUserSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters.')
    .required('Name must not be empty.'),
  email: Yup.string().email('Email must be a valid email.').required('Email must not be empty.'),
  positionId: Yup.string().required('Position must not be empty.'),
  role: Yup.string().required('Role must not be empty.'),
  regionIds: Yup.array()
    .of(Yup.string().required())
    .when('role', {
      is: 'SAM',
      then: (schema) => schema.required().min(1, 'Region must not be empty'),
      otherwise: (schema) => schema.notRequired(),
    }),

  territoryIds: Yup.array()
    .of(Yup.string().required())
    .when('role', {
      is: 'SAM',
      then: (schema) => schema.required().min(1, 'Territory must not be empty'),
      otherwise: (schema) => schema.notRequired(),
    }),
  password: Yup.string()
    .min(3, 'Password must be at least 3 characters.')
    .required('Password must not be empty.'),
  confirmPassword: Yup.string()
    .required('Password confirmation must not be empty.')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
});

export const ChangePasswordSchema = Yup.object({
  newPassword: Yup.string()
    .min(3, 'Password must be at least 3 characters.')
    .required('Password must not be empty.'),
  confirmPassword: Yup.string()
    .required('Password confirmation must not be empty.')
    .oneOf([Yup.ref('newPassword')], 'Your passwords do not match.'),
});
