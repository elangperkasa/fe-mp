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
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { useCreatePosition } from '../../../services/position/hooks/use-create-position';
import { CreatePositionSchema } from '../schema';
import { RoleService } from '../../../services/role/role-service';
import { RHFAutocompleteAsyncOnOpen } from '../../../components/hook-form/rhf-autocomplete';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function PositionQuickCreateForm({ open, onClose }: Props) {
  const { mutatePosition, error } = useCreatePosition();

  const roleService = new RoleService();

  const getRoles = async () => roleService.getAll();

  const defaultValues = useMemo(
    () => ({
      name: '',
      role: '',
    }),
    []
  );

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(CreatePositionSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (error) {
      setError('name', error);
    }
  }, [error]);

  const onSubmit = handleSubmit(async (payload) => {
    await mutatePosition({ payload });

    reset();
    onClose();
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
        <DialogTitle>Create Position</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} rowSpacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <RHFTextField name="name" label="Name" required />
            </Grid>
            <Grid item xs={6}>
              <RHFAutocompleteAsyncOnOpen required name="role" label="Role" asyncFn={getRoles} />
            </Grid>
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
            Create
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
