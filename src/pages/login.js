import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const handleLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();
    signIn("email", {
      email,
      redirect: false,
    }).then(function (result) {
      console.log(result);
      if (result.error !== null) {
        if (result.status === 401) {
          setLoginError("Your email is not in the system. Please try again");
        } else {
          setLoginError(result.error);
        }
      } else {
        router.push(result.url);
      }
    });
  };

  return (
    <>
      <div className="card">
        <form onSubmit={handleLogin}>
          {loginError}
          <label>
            Email:{" "}
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br></br>
          <button type="submit">Send Link</button>
        </form>
        <br></br>
        <div>
          <Link href={`/`}>
            <a>Back to home page</a>
          </Link>
        </div>
      </div>
    </>
  );
}
