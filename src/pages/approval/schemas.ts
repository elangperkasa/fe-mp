import * as Yup from 'yup';

export const EditApprovalSchema = Yup.object({
  approvalStatus: Yup.string().required('Approval status must not be empty.'),
  reason: Yup.string().when('approvalStatus', {
    is: (value: string) => value === 'rejected' || value === 'reconfirm',
    then: (schema) =>
      schema.required('Jika status Rejected atau Reconfirm, alasan tidak boleh kosong.'),
    otherwise: (schema) => schema.notRequired(),
  }),
});
