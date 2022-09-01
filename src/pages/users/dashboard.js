import React from "react";
import { Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <Heading>User Dashboard</Heading>
      <br></br>
      <div className={styles.grid}>
        <Link href={`/users/new`}>
          <a>New User Registration Form</a>
        </Link>
      </div>
    </div>
  );
}
