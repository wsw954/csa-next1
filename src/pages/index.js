import React from "react";
import { Heading } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Container>
      <div>
        <Heading>CSA-Next1</Heading>
        <div className={styles.grid}>
          <Link href={`/login`}>
            <a>Login </a>
          </Link>
        </div>
        <br></br>
        <div className={styles.grid}>
          <Link href={`/users/new`}>
            <a>New User Registration Form</a>
          </Link>
        </div>
      </div>
    </Container>
  );
}
