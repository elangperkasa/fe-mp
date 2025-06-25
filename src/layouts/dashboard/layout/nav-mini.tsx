import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { hideScroll } from 'src/theme/css';
import { LogoV } from 'src/components/logo';
import { NavSectionMini } from 'src/components/nav-section';
import { useAuthContext } from 'src/auth/hooks';
import { NavToggleButton } from 'src/layouts/_common';
import { NAV } from 'src/layouts/config-layout';
import { useNavData } from './config-navigation';

export default function NavMini() {
  const { user } = useAuthContext();

  const navData = useNavData();

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        <Stack width="100%" alignItems="center" sx={{ py: 3 }}>
          <LogoV />
        </Stack>

        <NavSectionMini
          data={navData}
          config={{
            currentRole: user?.role || 'GUEST',
          }}
        />
      </Stack>
    </Box>
  );
}
