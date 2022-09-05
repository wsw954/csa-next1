import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const { push, asPath } = useRouter();

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    push(data.url);
  };

  if (status === "authenticated") {
    return (
      <>
        <div>
          <Heading>Dealers Dashboard</Heading>
          <p>
            Signed in as {session.user.firstName} {session.user.lastName}
          </p>
        </div>
        <div className={styles.grid}>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      </>
    );
  }

  return (
    <div className={styles.grid}>
      <Link href={`/users/login`}>
        <a>Log In</a>
      </Link>
    </div>
  );
}
