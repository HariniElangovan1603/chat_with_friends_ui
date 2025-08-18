import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
  let [user, setUser] = useState(null)
  let route = useNavigate()

  useEffect(() => {
    let users = localStorage.getItem("user")
    if (!users || users ==='undefined')  {
      setUser(null)
    } else {
      let user_data = JSON.parse(users)
      setUser({ ...user_data })
    }

  },[])

  function handleLogout() {
    localStorage.removeItem("user")
    route("/signin")

  }
  return (
    <>
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="javascript:void(0)">Chat</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mynavbar">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <a class="nav-link" href="http://localhost:3000/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)">About Us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="http://localhost:3000/list">Users</a>
              </li>

            </ul>
            <form class="d-flex">
              {user !== null ? <>
                <a class="btn btn-outline-primary" type="button" >{user.name}</a>
                <a class="btn btn-primary  ms-3" type="button" onClick={handleLogout}>Logout</a>
              </> :
                <>
                  <a class="btn btn-primary" type="button" href="/create" >Register</a>
                  <a class="btn btn-outline-primary  ms-3" type="button" href="/signin">Sign In</a>
                </>}

            </form>
          </div>
        </div>
      </nav>

    </>
  )
}
