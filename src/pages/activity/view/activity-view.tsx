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
import TableContainer from '@mui/material/TableContainer';
import Scrollbar from '../../../components/scrollbar/scrollbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { IActivityItem, IActivityTableFilters } from '../../../types/activity';
import { GetAllActivityParams } from '../../../services/activity/activity.request';
import { useGetAllActivity } from '../../../services/activity/hooks/use-get-all-activity';
import ActivityTableToolbar from '../molecules/activity-table-toolbar';
import ActivityTableFiltersResult from '../molecules/activity-table-filters-result';
import ActivityTableRow from '../molecules/activity-table-row';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Label from '../../../components/label';
import { alpha } from '@mui/material/styles';

const TABLE_HEAD = [
  { id: 'date', label: 'Date', width: 100 },
  { id: 'name', label: 'Activity', width: 500 },
];

const defaultFilters: IActivityTableFilters = {
  name: '',
  startDate: new Date(new Date().getFullYear(), 0, 1),
  endDate: new Date(),
};

export function ActivityView() {
  const [filters, setFilters] = useState(defaultFilters);

  const table = useTable({
    defaultRowsPerPage: 5,
    defaultOrderBy: 'date',
  });

  const query = useMemo(
    () => ({
      page: table.page + 1,
      perPage: table.rowsPerPage,
      startDate: filters.startDate,
      endDate: filters.endDate,
    }),
    [table.page, table.rowsPerPage, filters]
  );

  const debouncedQuery = useDebounceQuery<GetAllActivityParams>(query, '');

  const { activities, meta, isFetching, error } = useGetAllActivity(debouncedQuery);

  const settings = useSettingsContext();

  const filteredActivities = applyFilter({
    inputData: activities,
    comparator: getComparator(table.order, table.orderBy),
  });

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = !activities.length;

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

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Activity"
        links={[{ name: 'Log' }, { name: 'Activity' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <Tabs
          value={'All'}
          sx={{
            px: 2.5,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          <Tab
            iconPosition="end"
            value="All"
            icon={
              <Label variant={'filled'} color={'default'} sx={{ cursor: 'pointer' }}>
                All
              </Label>
            }
          />
        </Tabs>

        <ActivityTableToolbar filters={filters} onFilters={handleFilters} />

        {canReset && (
          <ActivityTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={filteredActivities.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={activities.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                activities.map((row) => row.id)
              )
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={activities.length}
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
                    {filteredActivities.map((row) => (
                      <ActivityTableRow
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
  inputData: IActivityItem[];
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
