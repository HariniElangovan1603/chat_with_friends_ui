import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Chatbox.css";
import apiUrl from "../../apiConfig";
import axios from "axios";

export default function Chatbox() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  // Fetch users except current user
  async function getUsers() {
    try {
      const res = await axios.get(`${apiUrl}/users`);
      const filtered = res.data.filter(
        (user) => user._id !== (currentUser._id || currentUser.userid)
      );
      setUsers(filtered);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }
  

  // On click, store selected user and navigate
  function handleUserClick(user) {
    localStorage.setItem("selectedUser", JSON.stringify(user));
    navigate("/chatcreate");
  }

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Users</h2>
      <div className="list-group">
        {users.map((user) => (
          <div
            key={user._id || user.userid}
            className="border-bottom pt-2 pb-2 d-flex align-items-center user-item"
            style={{ cursor: "pointer" }}
            onClick={() => handleUserClick(user)}
          >
            <img
              src={
                user.imageUrl
                  ? user.imageUrl
                  : "https://static.vecteezy.com/system/resources/thumbnails/007/296/447/small_2x/user-icon-in-flat-style-person-icon-client-symbol-vector.jpg"
              }
              alt="User"
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />

            <strong>{user.name || user.user}</strong>
          </div>
        ))}
        
      </div>
    </div>
  );
}
