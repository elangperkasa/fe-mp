import { m } from 'framer-motion';
// @mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
// routes
import { useRouter } from 'src/hooks/use-router';
// hooks
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { paths } from '../../pages/paths';
import Iconify from '../../components/iconify';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();

  const { user } = useAuthContext();

  const { logout } = useAuthContext();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewAccount = () => {
    router.push(paths.account.root);
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  const OPTIONS = [
    // {
    //   label: 'Home',
    //   linkTo: pathAfterLogin(user?.role),
    // },
    // {
    //   label: 'Account',
    //   linkTo: paths.user.root,
    // },
    // {
    //   label: 'Web Authn',
    //   linkTo: paths.user.settings,
    // },
    // {
    //   label: 'Profile',
    //   linkTo: '/#1',
    // },
    // {
    //   label: 'Settings',
    //   linkTo: paths.user.settings,
    // },
  ];

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.photoUrl}
          alt={user?.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.name.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 300, p: 0 }}>
        <Stack alignItems="center" sx={{ p: 2, pb: 1.5 }}>
          <IconButton
            component={m.button}
            whileTap="tap"
            whileHover="hover"
            variants={varHover(1.05)}
            sx={{
              mb: 2,
              width: 105,
              height: 105,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
            }}
          >
            <Avatar
              src={user?.photoUrl}
              alt={user?.name}
              sx={{
                width: 100,
                height: 100,
                border: (theme) => `solid 2px ${theme.palette.background.default}`,
              }}
            >
              <Typography variant="h3">{user?.name.charAt(0).toUpperCase()}</Typography>
            </Avatar>
          </IconButton>

          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }} noWrap>
            {user?.role}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.Position.name}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <Button
            onClick={handleViewAccount}
            sx={{ width: 1, fontWeight: 'fontWeightBold', color: 'text.secondary' }}
          >
            Profile
          </Button>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <Button
            onClick={handleLogout}
            sx={{ width: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
          >
            Logout
          </Button>
        </Stack>
      </CustomPopover>
    </>
  );
}
