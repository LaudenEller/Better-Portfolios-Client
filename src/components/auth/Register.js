import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { registerUser } from "./AuthManager"
import './Auth.css'

export const Register = () => {
  const username = useRef()
  const firstName = useRef()
  const lastName = useRef()
  const password = useRef()
  const history = useHistory()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const email = useRef()

  const handleRegister = (e) => {
    e.preventDefault()

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        "username": username.current.value,
        "password": password.current.value,
        "email": email.current.value,
        "first_name": firstName.current.value,
        "last_name": lastName.current.value
      }

      registerUser(newUser).then(res => {
        if ("token" in res) {
          localStorage.setItem("auth_token", res.token)
          history.push("/")
        }
      })
    } else {
      passwordDialog.current.showModal()
    }
  }

  return (
    <main style={{ textAlign: "center" }}>

      <dialog className="dialog dialog--password" ref={passwordDialog}>
        <div>Passwords do not match</div>
        <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
      </dialog>

      <form className="form--login" onSubmit={handleRegister}>
        <h3>Register an account</h3>
        <fieldset>
          <label htmlFor="inputFirstName"></label>
          <input ref={firstName} type="text" name="first_name" placeholder="First Name" required />
        </fieldset>
        <fieldset>
          <label htmlFor="inputLastName"></label>
          <input ref={lastName} type="text" name="last_name" placeholder="Last Name" required />
        </fieldset>
        <fieldset>
          <label htmlFor="inputUsername"></label>
          <input ref={username} type="text" name="username" placeholder="Username" required />
        </fieldset>
        <fieldset>
          <label htmlFor="inputEmail"></label>
          <input ref={email} type="text" name="email" placeholder="Email" required />
        </fieldset>
        <fieldset>
          <label htmlFor="inputPassword"></label>
          <input ref={password} type="password" name="password" placeholder="Password" required />
        </fieldset>
        <fieldset>
          <label htmlFor="verifyPassword"></label>
          <input ref={verifyPassword} type="password" name="verifyPassword" className="form--control" placeholder="Verify Password" required />
        </fieldset>
        <fieldset>
          <button type="submit">Register</button>
        </fieldset>
      </form>
      <section>
        Already registered? <Link to="/login">Login</Link>
      </section>
    </main>
  )
}
