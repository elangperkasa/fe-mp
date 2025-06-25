import { useAuthContext } from '../../../auth/hooks';
import { useRouter } from '../../../hooks/use-router';
import { useEffect } from 'react';

export function IdamanLogout() {
  const { logout } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    void logout();
    
    router.push('/');
  }, []);

  return <></>;
}
