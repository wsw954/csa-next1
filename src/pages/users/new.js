import Link from "next/link";
import styles from "../../../styles/Home.module.css";
import React, { useState } from "react";

export default function NewUserForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");

  return (
    <div className="container">
      <h1 className={styles.title}>New User Register Form </h1>

      {/*action: The action attribute defines where the data gets sent. Its value must be a valid relative or absolute URL. If this attribute isn't provided, the data will be sent to the URL of the page containing the form — the current page.
	method: The HTTP method to submit the form with. (case insensitive) s*/}
      <div className="container">
        <form action="/api/user/new" method="post">
          <div>
            <label htmlFor="first">First Name</label>
            <input
              type="text"
              id="first"
              name="first"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="last">Last Name</label>
            <input
              type="text"
              id="last"
              name="last"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="role">Role </label>
            <select name="role" id="role">
              <option value="Buyer">Buyer</option>{" "}
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
