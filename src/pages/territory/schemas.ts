import * as Yup from 'yup';
import { ITerritoryStatus } from '../../types/territory';

const territoryStatus = Object.values(ITerritoryStatus);

export const EditTerritorySchema = Yup.object({
  name: Yup.string().required('Name must not be empty.'),
  regionId: Yup.string().required('Region must not be empty.'),
  description: Yup.string(),
  status: Yup.string()
    .oneOf(territoryStatus, 'Status must be one of the valid options: active or inactive')
    .required('Status is required')
    .nonNullable(),
});

export const FilterTerritoryListSchema = Yup.object({
  name: Yup.string(),
  status: Yup.string(),
  regionIds: Yup.string(),
});

export const UploadTerritoryTemplateSchema = Yup.object({
  file: Yup.mixed().required('File is required'),
});
