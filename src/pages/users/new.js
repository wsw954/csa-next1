import Link from "next/link";
import styles from "../../../styles/Home.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function NewUserForm() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const { push, asPath } = useRouter();

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(user);

    // API endpoint where we send form data.
    const endpoint = "/api/user/new";

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

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    const result = await response.json();
    if (result.success === true) {
      //Route the new user to the login page
      push("/login");
    }
  };

  return (
    <div className="container">
      <h1 className={styles.title}>New User Register Form </h1>

      {/*action: The action attribute defines where the data gets sent. Its value must be a valid relative or absolute URL. If this attribute isn't provided, the data will be sent to the URL of the page containing the form — the current page.
	method: The HTTP method to submit the form with. (case insensitive) s*/}
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="first">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              required
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="last">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              required
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="role">Role </label>
            <select
              name="role"
              id="role"
              onChange={handleChange}
              defaultValue="default"
            >
              <option value="default" disabled>
                --Select a Role--
              </option>
              <option value="Buyer">Buyer</option>
              <option value="Dealer">Dealer</option>
            </select>
          </div>
          <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <Link href={`/`}>
          <a>Back to home page</a>
        </Link>
      </div>
    </div>
  );
}
