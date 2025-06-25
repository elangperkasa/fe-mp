import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import { useCallback, useMemo, useState } from 'react';
import { ITerritoryItem, ITerritoryTableFilters } from '../../../types/territory';
import {
  getComparator,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  TableSkeleton,
  useTable,
} from '../../../components/table';
import { useDebounceQuery } from '../../../hooks/use-debounce';
import { GetAllTerritoryParams } from '../../../services/territory/territory.request';
import { useGetAllTerritory } from '../../../services/territory/hooks/use-get-all-territory';
import { useBoolean } from '../../../hooks/use-boolean';
import isEqual from 'lodash/isEqual';
import Tabs from '@mui/material/Tabs';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Label from '../../../components/label';
import TerritoryTableToolbar from '../molecules/territory-table-toolbar';
import TerritoryTableFiltersResult from '../molecules/territory-table-filters-result';
import TableContainer from '@mui/material/TableContainer';
import Scrollbar from '../../../components/scrollbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TerritoryTableRow from '../molecules/territory-table-row';
import { TerritoryQuickUploadForm } from '../molecules/territory-quick-upload-form';

export const STATUS_OPTIONS = [{ value: '', label: 'All' }];

const TABLE_HEAD = [
  { id: 'id', label: 'ID', width: 300 },
  { id: 'name', label: 'Name', width: 600 },
  { id: 'desc', label: 'Description', width: 600 },
  { id: 'status', label: 'Status', width: 300 },
];

const defaultFilters: ITerritoryTableFilters = {
  id: '',
  name: '',
  status: '',
  regionIds: '',
};

export function TerritoryView() {
  const [filters, setFilters] = useState(defaultFilters);

  const table = useTable({
    defaultRowsPerPage: 5,
  });

  const query = useMemo(
    () => ({
      page: table.page + 1,
      perPage: table.rowsPerPage,
      id: filters.id,
      name: filters.name,
      status: filters.status,
      regionIds: filters.regionIds,
    }),
    [table.page, table.rowsPerPage, filters]
  );

  const debouncedQuery = useDebounceQuery<GetAllTerritoryParams>(query, 'name');

  const { territories, meta, isFetching, error } = useGetAllTerritory(debouncedQuery);

  const settings = useSettingsContext();

  const quickUpload = useBoolean();

  const filteredTerritories = applyFilter({
    inputData: territories,
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

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Territory"
        links={[{ name: 'Master' }, { name: 'Territory' }]}
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

        <TerritoryTableToolbar filters={filters} onFilters={handleFilters} />

        {canReset && (
          <TerritoryTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={filteredTerritories.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={territories.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                territories.map((row) => row.id)
              )
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={territories.length}
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
                    {filteredTerritories.map((row) => (
                      <TerritoryTableRow
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

      <TerritoryQuickUploadForm open={quickUpload.value} onClose={quickUpload.onFalse} />
    </Container>
  );
}

function applyFilter({
  inputData,
  comparator,
}: {
  inputData: ITerritoryItem[];
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
