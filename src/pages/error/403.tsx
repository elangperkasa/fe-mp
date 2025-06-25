import { m } from 'framer-motion';
import Typography from '@mui/material/Typography';
import { ForbiddenIllustration } from 'src/assets/illustrations';
import { Helmet } from 'react-helmet-async';
import { MotionContainer, varBounce } from 'src/components/animate';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks/use-auth-context';
import { useRouter } from 'src/hooks/use-router';
import { useSearchParams } from 'src/hooks/use-search-params';

export default function View403() {
  const { logout } = useAuthContext();

  const searchParams = useSearchParams();

  const nonTerritory = searchParams.get('context');

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();

      router.push('/auth/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack
      sx={{
        mx: 'auto',
        maxWidth: 400,
        minHeight: '80vh',
        textAlign: 'center',
        justifyContent: 'center',
      }}
    >
      <Helmet>
        <title>403 No Permission!</title>
      </Helmet>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            No permission
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            {nonTerritory
              ? 'Please contact Super Admin to set the territory'
              : 'Please contact the admin to set the role'}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <m.div variants={varBounce().in}>
          <Button variant="contained" onClick={handleLogout}>
            Back to Login
          </Button>
        </m.div>
      </MotionContainer>
    </Stack>
  );
}
