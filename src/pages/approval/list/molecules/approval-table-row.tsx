import capitalize from '@mui/utils/capitalize';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../../../components/iconify';
import { ApprovalQuickApproveForm } from './approval-quick-approve-form';
import { useBoolean } from '../../../../hooks/use-boolean';
import CustomPopover, { usePopover } from '../../../../components/custom-popover';
import MenuItem from '@mui/material/MenuItem';
import Label from '../../../../components/label';
import { IApprovalItem } from '../../../../types/approval';
import Stack from '@mui/material/Stack';
import { useAuthContext } from '../../../../auth/hooks';
import Link from '@mui/material/Link';
import { checkApprovalPermission } from '../../utils';

type Props = {
  selected: boolean;
  row: IApprovalItem;
  onViewRow: VoidFunction;
};

export default function ApprovalTableRow({ row, selected, onViewRow }: Props) {
  const { user } = useAuthContext();

  const { identityCardNumber, name, phoneNumber, outletId, outlet, status, ownerStatus } = row;

  const popover = usePopover();

  const quickApprove = useBoolean();

  const renderApprovalButton = checkApprovalPermission(user?.role, ownerStatus);

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{outlet ? outlet.territory.name : '-'}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{outletId}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Link
            variant="body2"
            fontWeight={600}
            noWrap
            onClick={onViewRow}
            sx={{ color: 'text.primary', cursor: 'pointer' }}
          >
            {outlet?.name ?? '-'}
          </Link>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phoneNumber || '-'}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{name ? capitalize(name) : '-'}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{identityCardNumber || '-'}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          <Label
            variant="soft"
            color={
              (status === 'active' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'banned' && 'error') ||
              'default'
            }
          >
            {status || '-'}
          </Label>
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          <Label
            variant="soft"
            color={
              (ownerStatus === 'requested' && 'warning') ||
              (ownerStatus === 'verified' && 'info') ||
              (ownerStatus === 'approved' && 'success') ||
              (ownerStatus === 'rejected' && 'error') ||
              (ownerStatus === 'reconfirm' && 'secondary') ||
              'default'
            }
          >
            {ownerStatus || '-'}
          </Label>
        </TableCell>
        <TableCell>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Stack alignItems="center" justifyContent="center">
              <Iconify icon="eva:more-vertical-fill" />
            </Stack>
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        {renderApprovalButton && (
          <MenuItem
            onClick={() => {
              quickApprove.onTrue();
              popover.onClose();
            }}
          >
            <Iconify icon="mingcute:check-2-fill" />
            Approval
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="mingcute:eye-2-fill" />
          View
        </MenuItem>
      </CustomPopover>

      <ApprovalQuickApproveForm
        currentItem={row}
        open={quickApprove.value}
        onClose={quickApprove.onFalse}
      />
    </>
  );
}
