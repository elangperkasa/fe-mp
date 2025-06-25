import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Grid from '@mui/material/Grid';
import { ChangePasswordSchema } from '../../schemas';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../../../components/iconify';
import { useBoolean } from '../../../../hooks/use-boolean';
import { IUserItem } from '../../../../types/user';
import { useChangePasswordUser } from '../../../../services/user/hooks/use-change-password-user';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentUser: IUserItem;
};

const defaultValues = {
  newPassword: '',
  confirmPassword: '',
};

export default function UserQuickChangePasswordForm({ currentUser, open, onClose }: Props) {
  const { mutateUser, error } = useChangePasswordUser();

  const password = useBoolean();
  const confirmPassword = useBoolean();

  const methods = useForm({
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (error) {
      setError('newPassword', error);
    }
  }, [error]);

  const onSubmit = handleSubmit(async (payload) => {
    const { id } = currentUser;
    await mutateUser({ id, payload: { newPassword: payload.newPassword } });
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Change Password</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} rowSpacing={4} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <RHFTextField
                required
                autoComplete="new-password"
                name="newPassword"
                label="New Password"
                type={password.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={password.onToggle} edge="end">
                        <Iconify
                          icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <RHFTextField
                required
                autoComplete="confirm-password"
                name="confirmPassword"
                label="Confirm Password"
                type={confirmPassword.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={confirmPassword.onToggle} edge="end">
                        <Iconify
                          icon={confirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Change
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
