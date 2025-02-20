"use client";

import styles from "./page.module.css";
import { useUser } from '@/app/_hooks/useUser';

const PAGE_TITLE  = "Create";

export default function CreatePage() {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>{PAGE_TITLE}</h1>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>{PAGE_TITLE}</h1>
          <p>Error: {error.message}</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>{PAGE_TITLE}</h1>
          <p>Please log in to view your profile</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>{PAGE_TITLE}</h1>
        <p><strong>Provider:</strong> {user.identityProvider}</p>
        <p><strong>User ID:</strong> {user.userId}</p>
        <p><strong>User Details:</strong> {user.userDetails}</p>
        <p><strong>Roles:</strong> {user.userRoles.join(', ')}</p>
        <i>obtained from .auth/me</i>
      </div>
    </main>
  );
}
