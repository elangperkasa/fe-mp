import { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import { IActivityTableFilters } from '../../../types/activity';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fDate } from '../../../utils/format-time';

type Props = {
  filters: IActivityTableFilters;
  onFilters: (key: string, value: string) => void;
};

export default function ActivityTableToolbar({ filters, onFilters }: Props) {
  const handleFilterStartDate = useCallback((date: Date | null) => {
    if (date) onFilters('startDate', fDate(date));
  }, []);

  const handleFilterEndDate = useCallback((date: Date | null) => {
    if (date) onFilters('endDate', fDate(date));
  }, []);

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
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <DatePicker
            label="Start Date"
            value={filters.startDate}
            onChange={handleFilterStartDate}
            sx={{ width: 1 }}
            maxDate={new Date()}
          />
          <DatePicker
            label="End Date"
            value={filters.endDate}
            onChange={handleFilterEndDate}
            sx={{ width: 1 }}
            maxDate={new Date()}
          />
        </Stack>
      </Stack>
    </>
  );
}
