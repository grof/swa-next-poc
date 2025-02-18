"use client";

import { useEffect, useState } from 'react';
import styles from "./page.module.css";

interface User {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
}

export default function LandingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        setUser(payload.clientPrincipal);
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Home</h1>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Home</h1>
          <p>Please log in to view your profile</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Home</h1>
        <p><strong>Provider:</strong> {user.identityProvider}</p>
        <p><strong>User ID:</strong> {user.userId}</p>
        <p><strong>User Details:</strong> {user.userDetails}</p>
        <p><strong>Roles:</strong> {user.userRoles.join(', ')}</p>
        <i>obtained from .auth/me</i>
      </div>
    </main>
  );
}
