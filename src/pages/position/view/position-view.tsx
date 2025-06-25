import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Container from '@mui/material/Container';
import { useSettingsContext } from '../../../components/settings';
import Tabs from '@mui/material/Tabs';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Label from '../../../components/label';
import TableContainer from '@mui/material/TableContainer';
import {
  getComparator,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  TableSkeleton,
  useTable,
} from '../../../components/table';
import Scrollbar from '../../../components/scrollbar/scrollbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Card from '@mui/material/Card';
import { useCallback, useMemo, useState } from 'react';
import { useDebounceQuery } from '../../../hooks/use-debounce';
import { GetAllPositionParams } from '../../../services/position/position.request';
import isEqual from 'lodash/isEqual';
import { IPositionItem, IPositionTableFilters } from '../../../types/position';
import { useGetAllPosition } from '../../../services/position/hooks/use-get-all-position';
import PositionTableToolbar from '../molecules/position-table-toolbar';
import PositionTableFiltersResult from '../molecules/position-table-filters-result';
import PositionTableRow from '../molecules/position-table-row';
import { useBoolean } from '../../../hooks/use-boolean';
import { Button } from '@mui/material';
import Iconify from '../../../components/iconify';
import Stack from '@mui/material/Stack';
import { PositionQuickCreateForm } from '../molecules/position-quick-create-form';
import { useSyncPosition } from '../../../services/position/hooks/use-sync-position';
import LoadingButton from '@mui/lab/LoadingButton';

export const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const TABLE_HEAD = [
  { id: 'id', label: 'ID', width: 300 },
  { id: 'name', label: 'Name', width: 600 },
  { id: 'role', label: 'Role', width: 600 },
  { id: 'status', label: 'Status', width: 600 },
  { id: '', width: 100 },
];

const defaultFilters: IPositionTableFilters = {
  keyword: '',
  status: '',
};

export function PositionView() {
  const [filters, setFilters] = useState(defaultFilters);

  const quickCreate = useBoolean();

  const table = useTable({
    defaultRowsPerPage: 5,
    defaultOrderBy: 'no',
  });

  const query = useMemo(
    () => ({
      page: table.page + 1,
      perPage: table.rowsPerPage,
      status: filters.status,
      keyword: filters.keyword,
    }),
    [table.page, table.rowsPerPage, filters]
  );

  const debouncedQuery = useDebounceQuery<GetAllPositionParams>(query, 'name');

  const { positions, meta, isFetching, error } = useGetAllPosition(debouncedQuery);
  const { syncPosition, isSyncing } = useSyncPosition();

  const settings = useSettingsContext();

  const filteredPositions = applyFilter({
    inputData: positions,
    comparator: getComparator(table.order, table.orderBy),
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

  const handleSyncPosition = useCallback(async () => {
    await syncPosition();
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Position"
        links={[{ name: 'Authentication' }, { name: 'Position' }]}
        action={
          <Stack direction="row" gap={1}>
            <LoadingButton
              variant="contained"
              startIcon={<Iconify icon="mingcute:refresh-3-fill" />}
              onClick={handleSyncPosition}
              loading={isSyncing}
            >
              Sync Position
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
          {STATUS_OPTIONS.map((tab, i) => (
            <Tab
              key={i}
              iconPosition="end"
              value={tab.value}
              icon={
                <Label
                  variant={
                    ((tab.value === '' || tab.value === filters.status) && 'filled') || 'soft'
                  }
                  color={
                    (tab.value === 'active' && 'success') ||
                    (tab.value === 'inactive' && 'error') ||
                    'default'
                  }
                  sx={{ cursor: 'pointer' }}
                >
                  {tab.label}
                </Label>
              }
            />
          ))}
        </Tabs>

        <PositionTableToolbar filters={filters} onFilters={handleFilters} />

        {canReset && (
          <PositionTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={filteredPositions.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={positions.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                positions.map((row) => row.id)
              )
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={positions.length}
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
                    {filteredPositions.map((row) => (
                      <PositionTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                      />
                    ))}
                  </>
                )}

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

      <PositionQuickCreateForm open={quickCreate.value} onClose={quickCreate.onFalse} />
    </Container>
  );
}

function applyFilter({
  inputData,
  comparator,
}: {
  inputData: IPositionItem[];
  comparator: (a: any, b: any) => number;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  return inputData;
}
