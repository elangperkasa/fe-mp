import { ChangeEvent, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
import { IApprovalTableFilters } from '../../../../types/approval';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import capitalize from '@mui/utils/capitalize';
import Label from '../../../../components/label';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

type Props = {
  filters: IApprovalTableFilters;
  onFilters: (key: string, value: string) => void;
};

const baseOptions = ['requested', 'verified', 'approved', 'rejected', 'reconfirm'];

export default function ApprovalTableToolbar({ filters, onFilters }: Props) {
  const handleFilterRequestStatus = useCallback(
    (event: SelectChangeEvent<string>) => {
      onFilters('requestOwnerStatus', event.target.value);
    },
    [onFilters]
  );

  const handleFilterKeyword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onFilters('keyword', event.target.value);
    },
    [onFilters]
  );

  return (
    <>
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
            width: { xs: 1, md: 150 },
          }}
        >
          <InputLabel>Status Approval</InputLabel>
          <Select
            label="requestOwnerStatus"
            value={filters.requestOwnerStatus}
            onChange={handleFilterRequestStatus}
            variant="outlined"
          >
            {baseOptions.map((key) => (
              <MenuItem key={key} value={key} sx={{ textAlign: 'center' }}>
                <Label
                  variant="soft"
                  color={
                    (key === 'requested' && 'warning') ||
                    (key === 'verified' && 'info') ||
                    (key === 'approved' && 'success') ||
                    (key === 'rejected' && 'error') ||
                    (key === 'reconfirm' && 'secondary') ||
                    'default'
                  }
                  sx={{ cursor: 'pointer' }}
                >
                  {capitalize(key)}
                </Label>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          value={filters.keyword}
          onChange={handleFilterKeyword}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </>
  );
}
