import capitalize from '@mui/utils/capitalize';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Label from '../../../components/label';
import { ITerritoryItem } from '../../../types/territory';

type Props = {
  selected: boolean;
  row: ITerritoryItem;
};

export default function TerritoryTableRow({ row, selected }: Props) {
  const { id, name, description, status } = row;

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{capitalize(id)}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{capitalize(name)}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {description ? capitalize(description) : '-'}
        </TableCell>
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
    </>
  );
}
