import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/button";
import styles from "./index.module.css";

export default function AuthElement() {
  const { data: session, status } = useSession();

  if (status === "authenticated" && session?.user) {
    const userId = session.user.fdlst_private_userId;

    return (
      <div className={styles.root}>
        <span className={styles.name}>Hello, {session.user.name}</span>

        <nav className={styles.nav}>
          <Button variant="outline">
            <Link className={styles.link} href={`/list/${userId}`}>
              Your Wish List
            </Link>
          </Button>

          <Button variant="blue" clickHandler={() => signOut()}>
            Sign Out
          </Button>
        </nav>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Button variant="blue" clickHandler={() => signIn("github")}>
        Sign In
      </Button>
    </div>
  );
}