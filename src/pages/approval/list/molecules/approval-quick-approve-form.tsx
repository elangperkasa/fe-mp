import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import FormProvider, { RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { EditApprovalSchema } from '../../schemas';
import { IApprovalItem } from '../../../../types/approval';
import MenuItem from '@mui/material/MenuItem';
import Label from '../../../../components/label';
import { useUpdateApproval } from '../../../../services/approval/hooks/use-update-approval';

type Props = {
  open: boolean;
  onClose: () => void;
  currentItem?: IApprovalItem;
};

const baseOptions = ['verified', 'approved', 'reconfirm', 'rejected'];

export function ApprovalQuickApproveForm({ currentItem, open, onClose }: Props) {
  const { mutateApproval } = useUpdateApproval();

  const options = baseOptions.filter((option) => {
    if (currentItem?.ownerStatus === 'requested' || currentItem?.ownerStatus === 'reconfirm') {
      return option === 'verified' || option === 'rejected';
    }

    if (currentItem?.ownerStatus === 'verified') {
      return option === 'approved' || option === 'rejected' || option === 'reconfirm';
    }

    return true;
  });

  const defaultValues = useMemo(
    () => ({
      approvalStatus: '',
      reason: '',
    }),
    [currentItem]
  );

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(EditApprovalSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    resetField,
    reset,
  } = methods;

  const { approvalStatus } = watch();

  useEffect(() => {
    resetField('reason');
  }, [approvalStatus]);

  const onSubmit = handleSubmit(async (data) => {
    if (currentItem) {
      const { id } = currentItem;
      const payload = {
        ownerId: id,
        approvalStatus: data.approvalStatus,
        reason: data.reason || '',
      };

      await mutateApproval({ id, payload });

      onClose();
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Approval Akun</DialogTitle>

        <DialogContent>
          <Grid container columnSpacing={2} rowSpacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <RHFTextField name="outletName" label="Nama" value={currentItem?.name} disabled />
            </Grid>
            <Grid item xs={6}>
              <RHFSelect name="approvalStatus" label="Status Approval" required>
                {options.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    <Label
                      variant="soft"
                      color={
                        (status === 'verified' && 'success') ||
                        (status === 'reconfirm' && 'secondary') ||
                        (status === 'approved' && 'success') ||
                        'error'
                      }
                      sx={{ cursor: 'pointer' }}
                    >
                      {status}
                    </Label>
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            {(approvalStatus === 'rejected' || approvalStatus === 'reconfirm') && (
              <Grid item xs={12}>
                <RHFTextField name="reason" label="Alasan" />
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
