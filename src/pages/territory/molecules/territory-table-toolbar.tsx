import { useCallback, useEffect, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetAllRegion } from '../../../services/region/hooks/use-get-all-region';
import FormProvider from '../../../components/hook-form';
import { ITerritoryTableFilters } from '../../../types/territory';
import { FilterTerritoryListSchema } from '../schemas';

type Props = {
  filters: ITerritoryTableFilters;
  onFilters: (key: string, value: string) => void;
};

export default function TerritoryTableToolbar({ filters, onFilters }: Props) {
  const { regions } = useGetAllRegion();

  const defaultValues: ITerritoryTableFilters = useMemo(
    () => ({
      id: '',
      name: '',
      status: '',
      regionIds: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(FilterTerritoryListSchema),
    defaultValues,
  });

  const { reset } = methods;

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  const handleFilterRegion = useCallback(
    (event: SelectChangeEvent<string>) => {
      onFilters('regionIds', event.target.value);
    },
    [onFilters]
  );

  useEffect(() => {
    if (!filters.regionIds) {
      reset();
    }
  }, [filters]);

  return (
    <>
      <FormProvider methods={methods}>
        <Stack
          spacing={2}
          alignItems={{ xs: 'flex-end', md: 'center' }}
          direction={{
            xs: 'column',
            md: 'row',
          }}
          sx={{
            p: 2.5,
          }}
        >
          <FormControl
            sx={{
              flexShrink: 0,
              width: { xs: 1, md: 200 },
            }}
          >
            <InputLabel>Region</InputLabel>
            <Select
              label="Region"
              value={filters.regionIds}
              onChange={handleFilterRegion}
              variant="outlined"
            >
              {regions.map((region) => (
                <MenuItem key={region.id} value={region.id} sx={{ textTransform: 'capitalize' }}>
                  {region.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
            <TextField
              fullWidth
              value={filters.name}
              onChange={handleFilterName}
              placeholder="Search by name..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>
      </FormProvider>
    </>
  );
}
