import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import { TableHeadCustom } from 'src/components/table';
import { useTheme } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';

interface TableBasicProps {
  head: {
    id: string;
    label: string;
  }[];
  data: {
    first: string | number;
    second: string | number;
    third: string | number;
  }[];
}

export function TableBasic({ head, data }: TableBasicProps) {
  const theme = useTheme();

  return (
    <TableContainer
      sx={{
        borderRadius: 1,
        border: 1,
        borderColor: theme.palette.divider,
      }}
    >
      <Table>
        <TableHeadCustom headLabel={head} />

        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell align="center">{row.first}</TableCell>
              <TableCell align="center">{row.second}</TableCell>
              <TableCell align="center">{row.second}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
