import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { userApi } from '../services/userApi';

export const useAuthWithBackend = () => {
  const auth0 = useAuth0();
  const { isAuthenticated, user, isLoading } = auth0;
  const [backendUser, setBackendUser] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const syncUserWithBackend = async () => {
      if (isAuthenticated && user && !isLoading) {
        setIsSyncing(true);
        try {
          const userData = await userApi.createOrGet({
            id: user.sub,
            name: user.name || user.email,
          });
          
          setBackendUser(userData);
          console.log('User synced with backend:', userData);
        } catch (error) {
          console.error('Error syncing user with backend:', error);
        } finally {
          setIsSyncing(false);
        }
      } else if (!isAuthenticated) {
        setBackendUser(null);
      }
    };

    syncUserWithBackend();
  }, [isAuthenticated, user, isLoading]);

  return {
    ...auth0,
    backendUser,
    isSyncing,
  };
};
