import "./Navbar.css";
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Navbar() {
  let [user, setUser] = useState(null)
  let route = useNavigate()

  useEffect(() => {
    let users = localStorage.getItem("user")
    if (!users || users === 'undefined') {
      setUser(null)
    } else {
      let user_data = JSON.parse(users)
      setUser({ ...user_data })
    }

  }, [])

  function handleLogout() {
    localStorage.removeItem("user")
    route("/signin")

  }
  return (
    <>
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <div class="container-fluid">
          <Link className="navbar-brand d-flex align-items-center gap-1" to="/" id="chat-logo">
            <span className="logo-part logo-c">C</span>
            <span className="logo-part logo-h">h</span>
            <span className="logo-part logo-a">a</span>
            <span className="logo-part logo-t">t</span>
          </Link>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mynavbar">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <a class="nav-link" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)">About Us</a>
              </li>
              {/* <li class="nav-item">
                <a class="nav-link" href="/list">Users</a>
              </li> */}
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Users</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/post">Post</a></li>
                  <li><a class="dropdown-item" href="/show">Reels</a></li>
                  <li><a class="dropdown-item" href="/chatcreate">Chat</a></li>
                  <li><a class="dropdown-item" href="/list">users</a></li>

                </ul>
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
