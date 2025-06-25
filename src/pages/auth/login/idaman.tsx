import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { useAuthContext } from 'src/auth/hooks';
import { IDAMAN_CONFIG } from 'src/config-global';
import { useRouter } from 'src/hooks/use-router';
import { useSearchParams } from 'src/hooks/use-search-params';
import { Button, Typography } from '@mui/material';
import { LogoBlueWhite } from 'src/components/logo/logo-dynamic';
import Oidc from 'oidc-client';
import { isValidToken } from 'src/auth/context/jwt/utils';
import { LoadingScreen } from 'src/components/loading-screen';

export default function IdamanLoginView() {
  const { loginIdaman } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const mgr = new Oidc.UserManager(IDAMAN_CONFIG);

  const authorizationCode = searchParams.get('code');

  const handleIdamanLogin = async (accessToken: string) => {
    try {
      void loginIdaman(accessToken);

      router.push('/signin-oidc-idle');
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  };

  useEffect(() => {
    if (authorizationCode) {
      mgr
        .signinRedirectCallback()
        .then((user) => {
          if (user && user.access_token) {
            if (isValidToken(user.access_token)) {
              void handleIdamanLogin(user.access_token);
            } else {
              setErrorMsg('Failed to obtain access token due invalid token');
            }
          } else {
            setErrorMsg('Failed to obtain access token due no access token');
          }
        })
        .catch((error) => {
          console.error('Error exchanging code for token:', error);
          setErrorMsg('Failed to obtain access token');
        });
    }
  }, [authorizationCode]);

  const idamanLogin = () => {
    mgr.signinRedirect();
  };

  return authorizationCode ? (
    <LoadingScreen sx={{ minHeight: '100vh' }} />
  ) : (
    <Stack spacing={2.5}>
      {errorMsg && (
        <Typography variant="h3" sx={{ mb: 2 }}>
          {errorMsg}
        </Typography>
      )}
      <Button
        size="large"
        color="info"
        variant="outlined"
        startIcon={<LogoBlueWhite />}
        onClick={async () => idamanLogin()}
      >
        Login with IdaMan
      </Button>
    </Stack>
  );
}
