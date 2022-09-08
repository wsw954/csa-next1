import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";

export default function DealerDashboard() {
  const { data: session, status } = useSession();
  const { push, asPath } = useRouter();

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    push(data.url);
  };

  if (status === "authenticated" && session.user.role === "Dealer") {
    return (
      <>
        <Container>
          <div>
            <Heading>Dealers Dashboard</Heading>
          </div>
          <p>
            User: {session.user.firstName} {session.user.lastName}
          </p>
          <br></br>
          <div className="container">
            <div className={styles.grid}>
              <Link href={`/vehicles`}>
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
            <Link href={`/offers`}>
              <a>Check on Your Offers</a>
            </Link>
          </div>
          <br></br>
          <div className={styles.grid}>
            <Link href={`/dealers/:id`}>
              <a>Account Settings</a>
            </Link>
          </div>
          <br></br>
          <div className={styles.grid}>
            <button onClick={handleSignOut}>Sign out</button>
          </div>
        </Container>
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

e;
