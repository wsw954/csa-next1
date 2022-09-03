import React from "react";
import { Heading } from "@chakra-ui/react";
import { getSession, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  const { push, asPath } = useRouter();

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    push(data.url);
  };

  return (
    <div>
      <Heading>User Dashboard</Heading>
      <br></br>
      <div className={styles.grid}>
        <Link href={`/users/new`}>
          <a>New User Registration Form</a>
        </Link>
      </div>
      <br></br>
      <br></br>
      <div className={styles.grid}>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  );
}
