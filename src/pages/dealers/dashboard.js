import React from "react";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const { push, asPath } = useRouter();
  console.log(session);

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    push(data.url);
  };

  if (status === "authenticated " && session.user.role === "Dealer") {
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
  //Reroute the Buyer to relevant dashboard
  if (status === "authenticated" && session.user.role === "Buyer") {
    push("/buyers/dashboard");
  }
  return (
    <div className={styles.grid}>
      <Link href={`/login`}>
        <a>Log In</a>
      </Link>
    </div>
  );
}
