"use client";

import { useEffect, useState } from 'react';
import styles from "./page.module.css";

export default function LandingPage() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;
        setUserInfo(clientPrincipal);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>
          Home
        </h1>
        <p>
          {JSON.stringify(userInfo)}
        </p>
      </div>
    </main>
  );
}
