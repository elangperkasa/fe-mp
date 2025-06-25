// @mui
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableRow, { TableRowProps } from '@mui/material/TableRow';

type Props = TableRowProps & {
  colSpan?: number;
};

export default function TableSkeleton({ colSpan = 12, ...other }: Props) {
  return (
    <TableRow {...other}>
      <TableCell colSpan={colSpan}>
        <Skeleton sx={{ width: 1 }} />
      </TableCell>
    </TableRow>
  );
}
