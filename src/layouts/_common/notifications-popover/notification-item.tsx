import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import { fToNow } from 'src/utils/format-time';
import { SxProps, Theme } from '@mui/material/styles';
import { paths } from '../../../pages/paths';
import { IHighlightItem } from '../../../types/notification';
import Typography from '@mui/material/Typography';
import capitalize from '@mui/utils/capitalize';
import { useRouter } from '../../../hooks/use-router';
import { useCallback } from 'react';
import { useReadNotification } from '../../../services/notification/hooks/use-read-notification';

type NotificationItemProps = {
  sx?: SxProps<Theme>;
  notification: IHighlightItem;
  onCloseNotification?: () => void;
  text?: string;
};

export default function NotificationItem({
  notification,
  onCloseNotification,
  sx,
  text,
}: NotificationItemProps) {
  const router = useRouter();

  const { mutateNotification } = useReadNotification();

  const redirectId = notification.ownerId || notification.id;

  const handleOpen = useCallback(async () => {
    if (onCloseNotification) {
      onCloseNotification();
    }

    router.push(paths.approval.details(redirectId));

    const payload = {
      id: notification.id,
      isRequestedType: !notification.ownerId,
    };

    await mutateNotification({ payload });
  }, [redirectId]);

  const renderAvatar = (
    <ListItemAvatar>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
        }}
      >
        <Box
          component="img"
          src={`/assets/icons/notification/ic_mail.svg`}
          sx={{ width: 24, height: 24 }}
        />
      </Stack>
    </ListItemAvatar>
  );

  const renderText = (
    <ListItemText
      disableTypography
      primary={
        <Stack>
          <Typography variant="body2">
            <Box component="span" fontWeight="bold">
              {capitalize(notification.name || '-')}
            </Box>{' '}
            {text || 'needs an approval.'}
          </Typography>
        </Stack>
      }
      secondary={
        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
          divider={
            <Box
              sx={{
                width: 2,
                height: 2,
                bgcolor: 'currentColor',
                mx: 0.5,
                borderRadius: '50%',
              }}
            />
          }
        >
          {fToNow(notification.updatedAt)}
          Approval
        </Stack>
      }
    />
  );

  const renderUnReadBadge = !notification.isRead && (
    <Box
      sx={{
        top: 15,
        left: 15,
        width: 8,
        height: 8,
        borderRadius: '50%',
        bgcolor: 'info.main',
        position: 'absolute',
      }}
    />
  );

  return (
    <ListItemButton
      onClick={handleOpen}
      disableRipple
      sx={{
        p: 2.5,
        alignItems: 'flex-start',
        borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
        ...sx,
      }}
    >
      {renderUnReadBadge}

      {renderAvatar}

      <Stack sx={{ flexGrow: 1 }}>{renderText}</Stack>
    </ListItemButton>
  );
}

function reader(data: string) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: data }}
      sx={{
        mb: 0.5,
        '& p': { typography: 'body2', m: 0 },
        '& a': { color: 'inherit', textDecoration: 'none' },
        '& strong': { typography: 'subtitle2' },
      }}
    />
  );
}
