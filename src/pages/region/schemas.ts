import * as Yup from 'yup';
import { IRegionStatus } from '../../types/region';

const regionStatus = Object.values(IRegionStatus);

export const EditRegionSchema = Yup.object({
  name: Yup.string().required('Name must not be empty.'),
  description: Yup.string(),
  status: Yup.string()
    .oneOf(regionStatus, 'Status must be one of the valid options: active or inactive')
    .required('Status is required')
    .nonNullable(),
});
