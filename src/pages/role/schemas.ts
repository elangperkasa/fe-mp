import * as Yup from 'yup';

export const EditRoleSchema = Yup.object({
  name: Yup.string().required('Name must not be empty.'),
});
