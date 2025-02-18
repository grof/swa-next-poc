"use client";
import { useEffect, useState } from 'react';
import styles from "./page.module.css";

interface User {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
}

export default function ItemsPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndTimeInfo = async () => {
      try {
        const response = await fetch('/api/currentTime');
        const payload = await response.json();
        setUser(payload.user);
        setMessage(payload.message);
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndTimeInfo();
  }, []);

  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Items</h1>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  // if (!user) {
  //   return (
  //     <main className={styles.main}>
  //       <div className={styles.description}>
  //         <h1>Items</h1>
  //         <p>Please log in to view your user info</p>
  //       </div>
  //     </main>
  //   );
  // }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Items</h1>
        <p><strong>Provider:</strong> {user?.identityProvider}</p>
        <p><strong>User ID:</strong> {user?.userId}</p>
        <p><strong>User Details:</strong> {user?.userDetails}</p>
        <p><strong>Roles:</strong> {user?.userRoles.join(', ')}</p>
        <br/>
        <p><strong>Message:</strong> {message}</p>
        <i>obtained from api/currentTime</i>
      </div>
    </main>
  );
}

function OldItemsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>
          Items
        </h1>
      </div>
    </main>
  );
}

