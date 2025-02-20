'use client';

import styles from "./page.module.css";
import { useUser } from "./_hooks/useUser";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function LandingPage() {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && user) {
      redirect('/home');
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Welcome!</h1>
        <p>Please log in to continue.</p>
      </div>
    </main>
  );
}
