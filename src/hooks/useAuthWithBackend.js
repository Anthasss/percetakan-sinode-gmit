import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userApi } from '../services/userApi';

export const useAuthWithBackend = () => {
  const auth0 = useAuth0();
  const { isAuthenticated, user, isLoading } = auth0;
  const [backendUser, setBackendUser] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
          
          // Redirect admin users to /admin/order if they're on the home page
          if (userData.role === 'admin' && location.pathname === '/') {
            navigate('/admin/order');
          }
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
  }, [isAuthenticated, user, isLoading, navigate, location.pathname]);

  return {
    ...auth0,
    backendUser,
    isSyncing,
  };
};
