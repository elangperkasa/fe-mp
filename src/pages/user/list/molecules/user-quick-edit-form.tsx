import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import Grid from '@mui/material/Grid';
import { EditUserSchema } from '../../schemas';
import { useGetUserStatuses } from '../../../../services/user/hooks/use-get-user-statuses';
import Label from '../../../../components/label';
import { useUpdateUser } from '../../../../services/user/hooks/use-update-user';
import { IUserItem, IUserTerritory } from '../../../../types/user';
import { RHFAutocompleteAsyncOnSearch } from '../../../../components/hook-form/rhf-autocomplete';
import { RegionService } from '../../../../services/region/region-service';
import { TerritoryService } from '../../../../services/territory/territory-service';
import { useGetAllRegion } from '../../../../services/region/hooks/use-get-all-region';
import { PositionService } from '../../../../services/position/position-service';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentUser: IUserItem;
};

export default function UserQuickEditForm({ currentUser, open, onClose }: Props) {
  const { mutateUser, error } = useUpdateUser();
  const { statuses } = useGetUserStatuses();
  const { regions } = useGetAllRegion({ perPage: 10000 });

  const regionService = new RegionService();
  const territoryService = new TerritoryService();
  const positionService = new PositionService();

  const { extractedRegionIds, extractedTerritoryIds } = extractIds(currentUser.UserTerritory);

  const defaultValues = useMemo(() => {
    return {
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.Position.role ?? '',
      status: currentUser.status,
      positionId: currentUser.Position.id ?? '',
      regionIds: extractedRegionIds || [],
      territoryIds: extractedTerritoryIds || [],
    };
  }, [currentUser, extractedRegionIds, extractedTerritoryIds]);

  const methods = useForm({
    resolver: yupResolver(EditUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting },
    watch,
    reset,
    resetField,
  } = methods;

  const { positionId, role, regionIds } = watch();

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
    const { id } = currentUser;
    await mutateUser({ id, payload });
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
        <DialogTitle>Edit User Information</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} rowSpacing={4} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <RHFTextField name="name" label="Name" required />
            </Grid>
            <Grid item xs={6}>
              <RHFTextField name="email" label="Email" required disabled />
            </Grid>
            <Grid item xs={6}>
              <RHFAutocompleteAsyncOnSearch
                initialValue={currentUser.Position.name}
                name="positionId"
                label="Position"
                asyncFn={getPosition}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <RHFTextField name="role" label="Role" disabled />
            </Grid>
            {role == 'SAM' && (
              <>
                <Grid item xs={6}>
                  <RHFAutocompleteAsyncOnSearch
                    disabled={!regions}
                    name="regionIds"
                    label="Region"
                    asyncFn={getRegion}
                    initialValues={regions
                      .filter((region) => extractedRegionIds.includes(region.id))
                      .map((region) => ({
                        id: region.id,
                        name: region.name,
                      }))}
                    multiple
                  />
                </Grid>
                <Grid item xs={6}>
                  <RHFAutocompleteAsyncOnSearch
                    disabled={!regionIds || !regionIds.length}
                    name="territoryIds"
                    label="Territory"
                    asyncFn={getTerritory}
                    initialValues={currentUser.UserTerritory.map((territory) => ({
                      id: territory.territoryId,
                      name: territory.Territory.name,
                    }))}
                    multiple
                  />
                </Grid>
              </>
            )}
            <Grid item xs={6}>
              <RHFSelect name="status" label="Status" required>
                {statuses.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    <Label
                      variant="soft"
                      color={
                        (status === 'active' && 'success') ||
                        (status === 'pending' && 'warning') ||
                        (status === 'banned' && 'error') ||
                        'default'
                      }
                      sx={{ cursor: 'pointer' }}
                    >
                      {status || 'All'}
                    </Label>
                  </MenuItem>
                ))}
              </RHFSelect>
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
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

function extractIds(userTerritory: IUserTerritory[]) {
  const extractedTerritoryIds = userTerritory.map((item) => item.territoryId);

  const regionIdSet = new Set<string>();

  for (const item of userTerritory) {
    regionIdSet.add(item.Territory.regionId);
  }

  const extractedRegionIds = Array.from(regionIdSet);

  return { extractedTerritoryIds, extractedRegionIds };
}
