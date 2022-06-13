import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"
import { loginUser } from "./AuthManager"


export const Login = () => {
  const username = useRef()
  const password = useRef()
  const invalidDialog = useRef()
  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault()
    const user = {
      username: username.current.value,
      password: password.current.value
    }

    loginUser(user)
      .then(res => {
        if ("valid" in res && res.valid && "token" in res) {
          localStorage.setItem("auth_token", res.token)
          history.push("/")
        }
        else {
          invalidDialog.current.showModal()
        }
      })
  }

  return (
    <main style={{ textAlign: "center" }}>

      <dialog ref={invalidDialog}>
        <div>Username or password was not valid.</div>
        <button onClick={e => invalidDialog.current.close()}>Close</button>
      </dialog>
      
      <section>
        <form onSubmit={handleLogin}>
          <h3>Welcome Back!</h3>
          <fieldset>
            <label htmlFor="inputUsername"></label>
            <input ref={username} type="username" id="username" placeholder="Username" required autoFocus />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"></label>
            <input ref={password} type="password" id="password" placeholder="Password" required />
          </fieldset>
          <fieldset>
            <button type="submit">Sign In</button>
          </fieldset>
        </form>
      </section>
      <section>
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  )
}
