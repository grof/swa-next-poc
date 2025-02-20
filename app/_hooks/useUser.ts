import { useEffect, useState } from 'react';

export interface User {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
}

interface UseUserResult {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

export function useUser(): UseUserResult {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        console.log('Payload:', payload);
        setUser(payload.clientPrincipal);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError(error instanceof Error ? error : new Error('Failed to fetch user info'));
      } finally {
        setIsLoading(false);
      }
    };

    console.log('before fetchUserInfo');
    fetchUserInfo();
    console.log('after fetchUserInfo');
  }, []);

  return { user, isLoading, error };
}
