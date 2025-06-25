import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Container from '@mui/material/Container';
import { useSettingsContext } from '../../../components/settings';
import Grid from '@mui/material/Unstable_Grid2';
import NotificationItem from '../../../layouts/_common/notifications-popover/notification-item';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { LoadingScreen } from '../../../components/loading-screen';
import View500 from '../../error/500';
import { useGetAllNotification } from '../../../services/notification/hooks/use-get-all-notification';
import { Pagination } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Label from '../../../components/label';
import capitalize from '@mui/utils/capitalize';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Iconify from '../../../components/iconify';
import { useReadAllNotification } from '../../../services/notification/hooks/use-read-all-notification';
import { generateNotificationText } from '../../../layouts/_common/notifications-popover/utils';

const defaultFilters = {
  page: 1,
  perPage: 10,
  category: 'requested',
  isRead: false,
};

const STATUS_OPTIONS = ['requested', 'verified', 'approved', 'rejected', 'reconfirm'];

export function NotificationView() {
  const settings = useSettingsContext();

  const { mutateNotification } = useReadAllNotification();

  const [filters, setFilters] = useState(defaultFilters);

  const query = useMemo(
    () => ({
      page: filters.page,
      perPage: filters.perPage,
      category: filters.category,
      isRead: filters.isRead,
    }),
    [filters]
  );

  const { notifications, meta, isFetching, error } = useGetAllNotification(query);

  const handleFilters = useCallback((key: string, value: string | number | boolean) => {
    setFilters((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  const handlePerPageChange = useCallback((event: SelectChangeEvent) => {
    handleFilters('perPage', parseInt(event.target.value, 10));
    handleFilters('page', 1);
  }, []);

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    handleFilters('page', value);
  }, []);

  const handleFilterCategory = useCallback((event: SelectChangeEvent<string>) => {
    handleFilters('category', event.target.value);
  }, []);

  const handleFilterIsRead = useCallback((event: SelectChangeEvent<string>) => {
    const value = event.target.value === 'Sudah dibaca';
    handleFilters('isRead', value);
  }, []);

  const handleReadAll = useCallback(async () => {
    const ids = notifications.map((notification) => notification.id);

    const payload = {
      ids,
      isRequestedType: filters.category === 'requested',
    };

    await mutateNotification({ payload });
  }, [notifications]);

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (!notifications || error) {
    return <View500 />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Notification Center"
        links={[{ name: 'App' }, { name: 'Notification' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          <FormControl
            sx={{
              width: { xs: 1, md: 150 },
            }}
          >
            <InputLabel>Status Notifikasi</InputLabel>
            <Select
              label="Status Notifikasi"
              value={query.isRead ? 'Sudah dibaca' : 'Belum dibaca'}
              onChange={handleFilterIsRead}
              variant="outlined"
            >
              {['Belum dibaca', 'Sudah dibaca'].map((key) => (
                <MenuItem key={key} value={key} sx={{ textAlign: 'center' }}>
                  {capitalize(key)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            sx={{
              width: { xs: 1, md: 150 },
            }}
          >
            <InputLabel>Status Approval</InputLabel>
            <Select
              label="Status Approval"
              value={query.category}
              onChange={handleFilterCategory}
              variant="outlined"
            >
              {STATUS_OPTIONS.map((key) => (
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
        </Stack>
        {!filters.isRead && notifications.length > 0 && (
          <Button
            variant="contained"
            startIcon={<Iconify icon="solar:check-read-line-duotone" />}
            onClick={handleReadAll}
            sx={{ height: 35 }}
          >
            Read All
          </Button>
        )}
      </Stack>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid xs={12}>
          {!notifications.length ? (
            <Stack justifyContent="center" alignItems="center" sx={{ py: 6 }}>
              <Typography color="text.disabled">No new notification</Typography>
            </Stack>
          ) : (
            <>
              <List disablePadding>
                {notifications.map((notif, index) => (
                  <NotificationItem
                    key={index}
                    notification={notif}
                    text={generateNotificationText(filters.category)}
                  />
                ))}
              </List>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ py: 4 }}
              >
                <Pagination
                  page={filters.page}
                  shape="rounded"
                  count={meta?.page.total}
                  onChange={handlePageChange}
                />

                <FormControl size="small" sx={{ width: 120 }}>
                  <InputLabel htmlFor="per-page-select">Items per page</InputLabel>
                  <Select
                    variant="outlined"
                    value={String(filters.perPage)}
                    label="Item per page"
                    onChange={handlePerPageChange}
                    inputProps={{ id: 'per-page-select' }}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
