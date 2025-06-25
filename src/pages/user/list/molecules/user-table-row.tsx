import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import UserQuickEditForm from './user-quick-edit-form';
import { IUserItem } from '../../../../types/user';
import capitalize from '@mui/utils/capitalize';
import Label from '../../../../components/label';
import CustomPopover, { usePopover } from '../../../../components/custom-popover';
import MenuItem from '@mui/material/MenuItem';
import UserQuickChangePasswordForm from './user-quick-change-password';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import { Stack } from '@mui/material';

type Props = {
  row: IUserItem;
  selected: boolean;
  onViewRow: VoidFunction;
};

export default function UserTableRow({ row, selected, onViewRow }: Props) {
  const { name, email, status, Position, UserTerritory } = row;

  const popover = usePopover();

  const quickEditInformation = useBoolean();
  const quickChangePassword = useBoolean();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Link
            variant="body2"
            fontWeight={600}
            noWrap
            onClick={onViewRow}
            sx={{ color: 'text.primary', cursor: 'pointer' }}
          >
            {name}
          </Link>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {Position ? capitalize(Position.name) : '-'}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{Position.role || '-'}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Stack direction="row" gap={0.5}>
            {UserTerritory.length
              ? UserTerritory.map((item, index) => {
                  const MAX_CONTENT = 2;

                  if (index < MAX_CONTENT) {
                    return (
                      <Chip
                        key={index}
                        label={item.Territory.name}
                        color="primary"
                        variant="soft"
                      />
                    );
                  }

                  if (index > MAX_CONTENT && index === UserTerritory.length - 1) {
                    return (
                      <Link
                        key={index}
                        variant="body2"
                        fontWeight={600}
                        onClick={onViewRow}
                        sx={{ color: 'text.primary', cursor: 'pointer' }}
                        noWrap
                      >
                        <Chip label="SEE MORE" color="primary" />
                      </Link>
                    );
                  }
                })
              : '-'}
          </Stack>
        </TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'active' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'banned' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
          <IconButton onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 200 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="mingcute:eye-2-fill" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            quickEditInformation.onTrue();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit Information
        </MenuItem>

        {!row.idamanId && (
          <MenuItem
            onClick={() => {
              popover.onClose();
              quickChangePassword.onTrue();
            }}
          >
            <Iconify icon="mingcute:key-2-fill" />
            Change Password
          </MenuItem>
        )}
      </CustomPopover>

      <UserQuickEditForm
        currentUser={row}
        open={quickEditInformation.value}
        onClose={quickEditInformation.onFalse}
      />

      <UserQuickChangePasswordForm
        currentUser={row}
        open={quickChangePassword.value}
        onClose={quickChangePassword.onFalse}
      />
    </>
  );
}
