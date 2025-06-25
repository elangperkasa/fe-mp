import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { paths } from '../../../paths';
import { Button, CardContent } from '@mui/material';
import { useSettingsContext } from '../../../../components/settings';
import Container from '@mui/material/Container';
import { useGetUser } from '../../../../services/user/hooks/use-get-user';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Label from '../../../../components/label';
import capitalize from '@mui/utils/capitalize';
import Card from '@mui/material/Card';
import { LoadingScreen } from '../../../../components/loading-screen';
import View404 from '../../../error/404';
import { DetailsBoxItem } from '../../../approval/detail/molecules/detail-box-item';
import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import { useBoolean } from '../../../../hooks/use-boolean';
import UserQuickEditForm from '../../list/molecules/user-quick-edit-form';
import UserQuickChangePasswordForm from '../../list/molecules/user-quick-change-password';
import Chip from '@mui/material/Chip';

type Props = {
  id: string;
};

export function UserDetailView({ id }: Props) {
  const settings = useSettingsContext();

  const { user, isFetching } = useGetUser(id);

  const quickEditInformation = useBoolean();
  const quickChangePassword = useBoolean();

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <View404 />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="User Detail"
        links={[
          { name: 'Authentication' },
          { name: 'User List', href: paths.user.root },
          {
            name: 'User Detail',
          },
        ]}
        action={
          <Stack direction="row" gap={1}>
            {!user.idamanId && (
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:key-2-fill" />}
                onClick={quickChangePassword.onTrue}
              >
                Change Password
              </Button>
            )}
            <Button
              variant="contained"
              startIcon={<Iconify icon="solar:pen-bold" />}
              onClick={quickEditInformation.onTrue}
            >
              Edit Information
            </Button>
          </Stack>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <CardHeader title="User Information" />
        <CardContent>
          <Box
            columnGap={2}
            rowGap={1.5}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          >
            <DetailsBoxItem title="Nama" content={user.name} />
            <DetailsBoxItem title="Role" content={user.Position.role} />
            <DetailsBoxItem title="Email" content={user.email} />
            <DetailsBoxItem
              title="Status Akun"
              content={
                <Label
                  variant="soft"
                  color={
                    (user.status === 'active' && 'success') ||
                    (user.status === 'pending' && 'warning') ||
                    (user.status === 'banned' && 'error') ||
                    'default'
                  }
                  sx={{ cursor: 'pointer' }}
                >
                  {capitalize(user.status || '')}
                </Label>
              }
            />
            <DetailsBoxItem
              title="Territory"
              content={
                user.UserTerritory.length ? (
                  <Box
                    columnGap={0.5}
                    rowGap={0.5}
                    display="grid"
                    gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                  >
                    {user.UserTerritory.map((item, index) => (
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
        </CardContent>
      </Card>

      <UserQuickEditForm
        currentUser={user}
        open={quickEditInformation.value}
        onClose={quickEditInformation.onFalse}
      />

      <UserQuickChangePasswordForm
        currentUser={user}
        open={quickChangePassword.value}
        onClose={quickChangePassword.onFalse}
      />
    </Container>
  );
}
