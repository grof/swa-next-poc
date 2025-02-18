import { headers } from 'next/headers';
import styles from "./page.module.css";

interface User {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
}

async function getUser(): Promise<User | null> {
  const headersList = headers();
  const user = headersList.get('x-ms-client-principal');

  if (user) {
    const decodedUser = JSON.parse(Buffer.from(user, 'base64').toString('utf-8'));
    return decodedUser;
  }

  return null;
}

export default async function LibraryPage() {
  const user = await getUser();

  // if (!user) {
  //   return <div>Please log in to view your profile</div>
  // }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Library</h1>
        <p><strong>Provider:</strong> {user?.identityProvider}</p>
        <p><strong>User ID:</strong> {user?.userId}</p>
        <p><strong>User Details:</strong> {user?.userDetails}</p>
        <p><strong>Roles:</strong> {user?.userRoles.join(', ')}</p>
        <i>obtained from x-ms-client-principal header</i>
      </div>
    </main>
  );
}
