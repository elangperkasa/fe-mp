import capitalize from '@mui/utils/capitalize';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { IRoleItem } from '../../../types/role';
import Label from '../../../components/label';

type Props = {
  selected: boolean;
  row: IRoleItem;
};

export default function RoleTableRow({ row, selected }: Props) {
  const { id, name, status } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{capitalize(id)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{capitalize(name)}</TableCell>
      <TableCell>
        <Label
          variant="soft"
          color={
            (status === 'active' && 'success') || (status === 'inactive' && 'error') || 'default'
          }
        >
          {status}
        </Label>
      </TableCell>
    </TableRow>
  );
}
