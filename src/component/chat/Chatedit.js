import { useState, useEffect } from "react";
import "./Chatbox.css";
import axios from "axios";
import apiUrl from "../../apiConfig";
import { FaArrowRight } from "react-icons/fa";

export default function Chatedit() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({ message: "" });
  const [chatuser, setChatuser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  async function getUsers() {
    try {
      let res = await axios.get(`${apiUrl}/users`);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  function handleChange(e) {
    setData({ ...data, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedUser) {
      alert("Please select a user first!");
      return;
    }

    try {
      const payload = {
        ...data,
        userId: selectedUser._id || selectedUser.userid, // send message to specific user
      };

      const res = await axios.post(`${apiUrl}/chat`, payload);
      console.log("Message sent:", res.data);

      setData({ message: "" }); // clear input
      getChatuser(selectedUser._id || selectedUser.userid); // refresh chat
    } catch (err) {
      console.error("Error sending message:", err);
    }
  }

  async function getChatuser(userId) {
    try {
      let res = await axios.get(`${apiUrl}/chat?userId=${userId}`);
      setChatuser(res.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }

  function handleUserClick(user) {
    setSelectedUser(user);
    getChatuser(user._id || user.userid);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-left mb-4">Chat</h2>
      <div className="row">
        {/* Left column: User list */}
        <div className="col-md-4 border-end">
          {users.map((val) => (
            <div
              key={val._id || val.userid}
              className="border-bottom pt-2 pb-2 d-flex align-items-center user-item"
              style={{ cursor: "pointer" }}
              onClick={() => handleUserClick(val)}
            >
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/007/296/447/small_2x/user-icon-in-flat-style-person-icon-client-symbol-vector.jpg"
                alt="User"
                className="user-avatar-sm me-2"
                style={{ width: "35px", height: "35px", borderRadius: "50%" }}
              />
              <strong>{val.name || val.user}</strong>
              
            </div>
          ))}
        </div>

        {/* Right column: Chat messages + input */}
        <div className="col-md-8">
          {selectedUser ? (
            <>
              <h5 className="mb-3">
                <img
                src="https://static.vecteezy.com/system/resources/thumbnails/007/296/447/small_2x/user-icon-in-flat-style-person-icon-client-symbol-vector.jpg"
                alt="User"
                className="user-avatar-sm me-2"
                style={{ width: "35px", height: "35px", borderRadius: "50%" }}
              /> {selectedUser.name}</h5>
              <div className="chat-messages mb-3">
                {chatuser.length > 0 ? (
                  chatuser.map((chat) => (
                    <div key={chat._id} className="mb-2">
                      <p className="mb-1">{chat.message}</p>
                      <small className="text-muted">
                        {chat.createdAt
                          ? new Date(chat.createdAt).toLocaleString()
                          : ""}
                      </small>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No messages yet...</p>
                )}
              </div>

              {/* Message form */}
              <form onSubmit={handleSubmit}>
                <div className="input-group margin-top-50px">
                  <input
                    type="text"
                    className="form-control"
                    id="message"
                    placeholder="Type a message..."
                    onChange={handleChange}
                    value={data.message}
                  />
                  <button type="submit" className="btn btn-primary chat-box">
                    <FaArrowRight />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <p className="text-muted">Select a user to start chatting</p>
          )}
        </div>
      </div>
    </div>
  );
}
