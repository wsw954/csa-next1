import React from "react";
import { useSession } from "next-auth/react";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";
import { Heading } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";

export default function NewVehicleForm() {
  let { data: session, status } = useSession();

  if (status === "authenticated") {
    // Handles the submit event on form submit.
    const handleSubmit = async (event) => {
      // Stop the form from submitting and refreshing the page.
      event.preventDefault();
      // Get data from the form.
      const data = {
        userID: session.user.id,
        userRole: session.user.role,
        make: event.target.make.value,
        model: event.target.model.value,
      };

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data);

      // API endpoint where we send form data.
      const endpoint = "/api/vehicles/new";

      // Form the request for sending data to the server.
      const options = {
        // The method is POST because we are sending data.
        method: "POST",
        // Tell the server we're sending JSON.
        headers: {
          "Content-Type": "application/json",
        },
        // Body of the request is the JSON data we created above.
        body: JSONdata,
      };
      // Send the form data to forms API
      const response = await fetch(endpoint, options);

      // Get the response data from server as JSON.
      // If server returns the name submitted, that means the form works.
      const result = await response.json();
      // alert(`Is this your vehicle ${result.newVehicle.make}`);
    };
    return (
      <>
        <Container>
          <div>
            <Heading>Buyers Dashboard</Heading>
          </div>
          <p>
            User: {session.user.firstName} {session.user.lastName}
          </p>
          <br></br>
          <div>
            <form onSubmit={handleSubmit}>
              <Select></Select>
              <label htmlFor="make">Make</label>
              <input type="text" id="make" name="make" required />

              <label htmlFor="model">Model</label>
              <input type="text" id="model" name="model" required />

              <button type="submit">Submit</button>
            </form>
            <br></br>
          </div>

          <div>
            <Link href={"/" + session.user.role.toLowerCase() + "s/dashboard"}>
              <a>Back to Home-</a>
            </Link>
          </div>
        </Container>
      </>
    );
  } else {
    return (
      <div className={styles.grid}>
        <Link href={`/login`}>
          <a>Log In</a>
        </Link>
      </div>
    );
  }
}
