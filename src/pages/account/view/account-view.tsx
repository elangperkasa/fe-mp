import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card/Card';
import Avatar from '@mui/material/Avatar';
import { useAuthContext } from 'src/auth/hooks';
import Stack from '@mui/material/Stack';
import { Box, Typography } from '@mui/material';
import { DetailsBoxItem } from '../../approval/detail/molecules/detail-box-item';
import Chip from '@mui/material/Chip';
import { m } from 'framer-motion';
import { varHover } from '../../../components/animate';
import IconButton from '@mui/material/IconButton';
import Label from '../../../components/label';
import capitalize from '@mui/utils/capitalize';
import { IUserTerritory } from '../../../types/user';

export function AccountView() {
  const settings = useSettingsContext();

  const { user } = useAuthContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[{ name: 'App' }, { name: 'Profile' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ p: 8 }}>
            <Stack justifyContent="center" alignItems="center" direction="column" gap={2}>
              <IconButton
                component={m.button}
                whileTap="tap"
                whileHover="hover"
                variants={varHover(1.05)}
                sx={{
                  width: 160,
                  height: 160,
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                }}
              >
                <Avatar
                  src={user?.photoUrl}
                  alt={user?.name}
                  sx={{
                    width: 150,
                    height: 150,
                    border: (theme) => `solid 2px ${theme.palette.background.default}`,
                  }}
                >
                  <Typography variant="h2">{user?.name.charAt(0).toUpperCase()}</Typography>
                </Avatar>
              </IconButton>

              <Stack alignItems="center">
                <Typography variant="subtitle1">{user?.name}</Typography>
                <Typography variant="body2" color="text.disabled">
                  {user?.email}
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 4 }}>
            <Box
              columnGap={2}
              rowGap={1.5}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            >
              <DetailsBoxItem title="Nama" content={user?.name} />
              <DetailsBoxItem title="Email" content={user?.email} />
              <DetailsBoxItem title="Position" content={user?.Position.name} />
              <DetailsBoxItem title="Role" content={user?.role} />
              <DetailsBoxItem
                title="Status Akun"
                content={
                  <Label
                    variant="soft"
                    color={
                      (user?.status === 'active' && 'success') ||
                      (user?.status === 'pending' && 'warning') ||
                      (user?.status === 'banned' && 'error') ||
                      'default'
                    }
                    sx={{ cursor: 'pointer' }}
                  >
                    {capitalize(user?.status || '')}
                  </Label>
                }
              />
              <DetailsBoxItem
                title="Territory"
                content={
                  user?.UserTerritory.length ? (
                    <Box
                      columnGap={0.5}
                      rowGap={0.5}
                      display="grid"
                      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                    >
                      {user?.UserTerritory.map((item: IUserTerritory, index: number) => (
                        <Chip
                          key={index}
                          label={item.Territory.name}
                          color="primary"
                          variant="soft"
                        />
                      ))}
                    </Box>
                  ) : (
                    '-'
                  )
                }
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
