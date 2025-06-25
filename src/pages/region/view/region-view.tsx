import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import { useCallback, useMemo, useState } from 'react';
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
import isEqual from 'lodash/isEqual';
import Tabs from '@mui/material/Tabs';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Label from '../../../components/label';
import RegionTableToolbar from '../molecules/region-table-toolbar';
import RegionTableFiltersResult from '../molecules/region-table-filters-result';
import TableContainer from '@mui/material/TableContainer';
import Scrollbar from '../../../components/scrollbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import RegionTableRow from '../molecules/region-table-row';
import { IRegionItem, IRegionTableFilters } from '../../../types/region';
import { GetAllRegionParams } from '../../../services/region/region.request';
import { useGetAllRegion } from '../../../services/region/hooks/use-get-all-region';

export const STATUS_OPTIONS = [{ value: '', label: 'All' }];

const TABLE_HEAD = [
  { id: 'id', label: 'ID', width: 300 },
  { id: 'name', label: 'Name', width: 600 },
  { id: 'desc', label: 'Description', width: 600 },
  { id: 'status', label: 'Status', width: 300 },
];

const defaultFilters: IRegionTableFilters = {
  id: '',
  name: '',
  status: '',
};

export function RegionView() {
  const [filters, setFilters] = useState(defaultFilters);

  const table = useTable({
    defaultRowsPerPage: 5,
  });

  const query = useMemo(
    () => ({
      page: table.page + 1,
      perPage: table.rowsPerPage,
      status: filters.status,
      id: filters.id,
      name: filters.name,
    }),
    [table.page, table.rowsPerPage, filters]
  );

  const debouncedQuery = useDebounceQuery<GetAllRegionParams>(query, 'name');

  const { regions, meta, isFetching, error } = useGetAllRegion(debouncedQuery);

  const settings = useSettingsContext();

  const filteredRegions = applyFilter({
    inputData: regions,
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
        heading="Region"
        links={[{ name: 'Master' }, { name: 'Region' }]}
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

        <RegionTableToolbar filters={filters} onFilters={handleFilters} />

        {canReset && (
          <RegionTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={filteredRegions.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={regions.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                regions.map((row) => row.id)
              )
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={regions.length}
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
                    {filteredRegions.map((row) => (
                      <RegionTableRow
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
    </Container>
  );
}

function applyFilter({
  inputData,
  comparator,
}: {
  inputData: IRegionItem[];
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
