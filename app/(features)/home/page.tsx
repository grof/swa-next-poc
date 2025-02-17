"use client";

import styles from "./page.module.css";

async function getUserInfo() {
  const response = await fetch('/.auth/me');
  const payload = await response.json();
  const { clientPrincipal } = payload;
  return clientPrincipal;
}

export default async function LandingPage() {
  const userInfo = await getUserInfo();

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
