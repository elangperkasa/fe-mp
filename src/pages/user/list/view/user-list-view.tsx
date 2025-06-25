import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import Iconify from '../../../../components/iconify';
import { useSettingsContext } from '../../../../components/settings';
import { IUserItem, IUserTableFilters } from '../../../../types/user';
import { useCallback, useMemo, useState } from 'react';
import { useGetUserStatuses } from '../../../../services/user/hooks/use-get-user-statuses';
import {
  getComparator,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  TableSkeleton,
  useTable,
} from '../../../../components/table';
import { useDebounceQuery } from '../../../../hooks/use-debounce';
import { GetAllUserParams } from '../../../../services/user/user.request';
import { useGetAllUser } from '../../../../services/user/hooks/use-get-all-user';
import { useBoolean } from '../../../../hooks/use-boolean';
import isEqual from 'lodash/isEqual';
import Tabs from '@mui/material/Tabs';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Label from '../../../../components/label';
import UserTableToolbar from '../molecules/user-table-toolbar';
import UserTableFiltersResult from '../molecules/user-table-filters-result';
import TableContainer from '@mui/material/TableContainer';
import Scrollbar from '../../../../components/scrollbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import UserTableRow from '../molecules/user-table-row';
import { UserQuickCreateForm } from '../molecules/user-quick-create-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSyncUser } from '../../../../services/user/hooks/use-sync-user';
import { paths } from '../../../paths';
import { useRouter } from '../../../../hooks/use-router';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', width: 300 },
  { id: 'email', label: 'Email', width: 200 },
  { id: 'position', label: 'Position', width: 200 },
  { id: 'role', label: 'Role', width: 200 },
  { id: 'territory', label: 'Territory', width: 200 },
  { id: 'status', label: 'Status', width: 100 },
  { id: '', width: 100 },
];

const defaultFilters: IUserTableFilters = {
  status: '',
  name: '',
  role: '',
};

export function UserListView() {
  const [filters, setFilters] = useState(defaultFilters);

  const { statuses } = useGetUserStatuses();

  const router = useRouter();

  const statusOptions = ['', ...statuses];

  const table = useTable({
    defaultRowsPerPage: 5,
  });

  const query = useMemo(
    () => ({
      page: table.page + 1,
      perPage: table.rowsPerPage,
      status: filters.status,
      name: filters.name,
      role: filters.role,
    }),
    [table.page, table.rowsPerPage, filters]
  );

  const debouncedQuery = useDebounceQuery<GetAllUserParams>(query, 'name');

  const { users, meta, isFetching, error } = useGetAllUser(debouncedQuery);

  const { syncUser, isSyncing } = useSyncUser();

  const settings = useSettingsContext();

  const quickCreate = useBoolean();

  const filteredUsers = applyFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = !!error;

  const handleFilters = useCallback(
    (key: string, value: string) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    },
    [table]
  );

  const handleFilterStatus = useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.user.details(id));
    },
    [router]
  );

  const handleSyncUser = useCallback(async () => {
    await syncUser();
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="User"
        links={[{ name: 'Authentication' }, { name: 'User' }]}
        action={
          <Stack direction="row" gap={1}>
            <LoadingButton
              variant="contained"
              startIcon={<Iconify icon="mingcute:refresh-3-fill" />}
              onClick={handleSyncUser}
              loading={isSyncing}
            >
              Sync User
            </LoadingButton>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={quickCreate.onTrue}
            >
              Create
            </Button>
          </Stack>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <Tabs
          value={filters.status}
          onChange={handleFilterStatus}
          sx={{
            px: 2.5,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {statusOptions.map((status, i) => (
            <Tab
              key={i}
              iconPosition="end"
              value={status}
              icon={
                <Label
                  variant={((status === '' || status === filters.status) && 'filled') || 'soft'}
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
              }
            />
          ))}
        </Tabs>

        <UserTableToolbar filters={filters} onFilters={handleFilters} />

        {canReset && (
          <UserTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={filteredUsers.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={filteredUsers.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                filteredUsers.map((row) => row.id)
              )
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={filteredUsers.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {isFetching ? (
                  [...Array(table.rowsPerPage)].map((_i, index) => (
                    <TableSkeleton
                      key={index}
                      sx={{ height: denseHeight }}
                      colSpan={TABLE_HEAD.length}
                    />
                  ))
                ) : (
                  <>
                    {filteredUsers.map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                      />
                    ))}
                  </>
                )}

                {/* <TableEmptyRows */}
                {/*  height={denseHeight} */}
                {/*  emptyRows={emptyRows(table.page, table.rowsPerPage, filteredUsers.length)} */}
                {/* /> */}

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={meta?.record.total || 0}
          page={table.page && meta?.record.total ? table.page : 0}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>

      <UserQuickCreateForm open={quickCreate.value} onClose={quickCreate.onFalse} />
    </Container>
  );
}

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IUserItem[];
  comparator: (a: any, b: any) => number;
  filters: IUserTableFilters;
}) {
  const { name, status } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  return inputData;
}
