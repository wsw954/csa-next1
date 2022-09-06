import React from "react";
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

  if (status === "authenticated" && session.user.role === "Buyer") {
    return (
      <>
        <div>
          <Heading>Buyers Dashboard</Heading>
          <p>
            {session.user.firstName} {session.user.lastName}
          </p>
        </div>
        <br></br>
        <div className="container">
          <div className={styles.grid}>
            <Link href={`/buyers/vehicles/index`}>
              <a>Vehicles Index</a>
            </Link>
          </div>
        </div>
        <br></br>
        <div className={styles.grid}>
          <Link href={`/vehicles/new`}>
            <a>Create a New Vehicle</a>
          </Link>
        </div>
        <br></br>
        <div className={styles.grid}>
          <Link href={`vehicles/index`}>
            <a>Check Your Requests</a>
          </Link>
        </div>
        <br></br>
        <div className={styles.grid}>
          <Link href={`/requests`}>
            <a>Check Your Requests</a>
          </Link>
        </div>
        <br></br>
        <div className={styles.grid}>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      </>
    );
  }
  //Reroute the Buyer to relevant dashboard
  if (status === "authenticated" && session.user.role === "Dealer") {
    push("/dealers/dashboard");
  }

  return (
    <div className={styles.grid}>
      <Link href={`/login`}>
        <a>Log In</a>
      </Link>
    </div>
  );
}
