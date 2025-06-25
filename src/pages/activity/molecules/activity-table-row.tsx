import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { IActivityItem } from '../../../types/activity';
import { fDateISOString } from '../../../utils/format-time';

type Props = {
  selected: boolean;
  row: IActivityItem;
};

export default function ActivityTableRow({ row, selected }: Props) {
  const { id, activity, createdAt } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDateISOString(createdAt)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{activity}</TableCell>
    </TableRow>
  );
}
