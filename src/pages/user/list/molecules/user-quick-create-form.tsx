import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { yupResolver } from '@hookform/resolvers/yup';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useEffect, useMemo } from 'react';
import FormProvider, { RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { CreateUserSchema } from '../../schemas';
import { useGetUserRoles } from '../../../../services/user/hooks/use-get-user-roles';
import { useCreateUser } from '../../../../services/user/hooks/use-create-user';
import Iconify from '../../../../components/iconify';
import { useBoolean } from '../../../../hooks/use-boolean';
import { RHFAutocompleteAsyncOnSearch } from '../../../../components/hook-form/rhf-autocomplete';
import { RegionService } from '../../../../services/region/region-service';
import { TerritoryService } from '../../../../services/territory/territory-service';
import { PositionService } from '../../../../services/position/position-service';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function UserQuickCreateForm({ open, onClose }: Props) {
  const { mutateUser, error } = useCreateUser();
  const { roles } = useGetUserRoles();

  const password = useBoolean();
  const confirmPassword = useBoolean();

  const positionService = new PositionService();
  const regionService = new RegionService();
  const territoryService = new TerritoryService();

  const defaultValues = useMemo(
    () => ({
      name: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: '',
      positionId: '',
      regionIds: [],
      territoryIds: [],
    }),
    []
  );

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(CreateUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting },
    watch,
    resetField,
    setValue,
  } = methods;

  const { role, positionId, regionIds } = watch();

  const getPosition = (keyword?: string) => positionService.getAll({ status: 'active', keyword });
  const getRegion = (keyword?: string) => regionService.getAll({ name: keyword });
  const getTerritory = (keyword?: string) => {
    const { regionIds } = watch();
    return territoryService.getAll({
      name: keyword,
      regionIds: regionIds ? regionIds.join(';') : '',
    });
  };

  useEffect(() => {
    resetField('regionIds');
    resetField('territoryIds');
  }, [role]);

  useEffect(() => {
    if (positionId) {
      (async function x() {
        const { role } = await positionService.get(positionId);

        if (role) {
          setValue('role', role);
        }
      })();
    }
  }, [positionId]);

  useEffect(() => {
    if (error) {
      Object.entries(error.message).forEach(([key, value]) => {
        const message = Array.isArray(value) ? value[0] : value;
        setError(key as any, { message: message });
      });
    }
  }, [error]);

  const onSubmit = handleSubmit(async (payload) => {
    await mutateUser({ payload });

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
        <DialogTitle>Create User</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} rowSpacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <RHFTextField name="name" label="Name" required />
            </Grid>
            <Grid item xs={6}>
              <RHFTextField name="email" label="Email" autoComplete="email" required />
            </Grid>
            <Grid item xs={6}>
              <RHFAutocompleteAsyncOnSearch
                name="positionId"
                label="Position"
                asyncFn={getPosition}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <RHFSelect name="role" label="Role" disabled required>
                {roles.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            {role == 'SAM' && (
              <>
                <Grid item xs={6}>
                  <RHFAutocompleteAsyncOnSearch
                    name="regionIds"
                    label="Region"
                    asyncFn={getRegion}
                    multiple
                  />
                </Grid>
                <Grid item xs={6}>
                  <RHFAutocompleteAsyncOnSearch
                    disabled={!regionIds || !regionIds.length}
                    name="territoryIds"
                    label="Territory"
                    asyncFn={getTerritory}
                    multiple
                  />
                </Grid>
              </>
            )}
            <Grid item xs={6}>
              <RHFTextField
                required
                autoComplete="new-password"
                name="password"
                label="Password"
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
