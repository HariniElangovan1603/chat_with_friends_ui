import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Chatbox.css";
import './Chatcreate.css';
import axios from "axios";
import apiUrl from "../../apiConfig";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

export default function Chatcreate() {
  const [users, setUsers] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Fetch all users except current user
  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}/users`);
      const myId = currentUser?._id ?? currentUser?.userid;
      const filtered = myId
        ? res.data.filter((u) => u._id !== myId)
        : res.data;
      setUsers(filtered);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }, [currentUser]);


  // Fetch messages with a specific user
  const getChatWithUser = useCallback(async () => {
    if (!currentUser || !selectedUser) return;
    try {
      const res = await axios.get(`${apiUrl}/chat/conversation`, {
        params: {
          user1: currentUser._id ?? currentUser.userid,
          user2: selectedUser._id ?? selectedUser.userid,
        },
      });
      setChatMessages(res.data);
    } catch (err) {
      console.error("Error fetching chats:", err);
    }
  }, [currentUser, selectedUser]);


  // Send a new message
  async function handleSendMessage(e) {
    e.preventDefault();
    if (!message || !selectedUser || !currentUser) return;

    const payload = {
      senderId: currentUser._id || currentUser.userid,
      receiverId: selectedUser._id || selectedUser.userid,
      message,
    };

    try {
      await axios.post(`${apiUrl}/chat`, payload);
      setMessage("");
      getChatWithUser(selectedUser); // refresh chat
    } catch (err) {
      console.error("Error sending message:", err);
    }
  }

  // Select a user from the list
  function handleSelectUser(user) {
    setSelectedUser(user);
    localStorage.setItem("selectedUser", JSON.stringify(user));
    getChatWithUser(user);
  }

  // Load current user and optionally selected user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setCurrentUser(storedUser);

    const storedSelectedUser = JSON.parse(localStorage.getItem("selectedUser"));
    if (storedSelectedUser) setSelectedUser(storedSelectedUser);
  }, []); // run only once on mount

  // Fetch users when currentUser is set
  useEffect(() => {
    if (currentUser) getUsers();
  }, [currentUser, getUsers]);

  // Fetch chat when selectedUser changes
  useEffect(() => {
    if (currentUser && selectedUser) getChatWithUser();
  }, [currentUser, selectedUser, getChatWithUser]);

  // Scroll to bottom whenever chatMessages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);


  return (
    <div className="container">
      <h2 className="text-left mt-2">Chat</h2>
      <div className="row">
        {/* Left: User List */}
        <div className="col-md-4 border-end res">
          {users.map((user) => (
            <div
              key={user._id || user.userid}
              className="border-bottom pt-2 pb-2 d-flex align-items-center user-item"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectUser(user)}
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

        {/* Right: Chat Messages */}
        <div className="col-md-8">
          {selectedUser && (
            <>
              <div
                className="mb-2 d-flex align-items-center"
                style={{
                  backgroundColor: "black",
                  color: "whitesmoke",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                <button
                  className="arrow mx-2"
                  style={{ background: "transparent", border: "none" }}
                  onClick={() => navigate("/chatbox")}
                >
                  <FaArrowLeft style={{ color: "white" }} />
                </button>
                <img
                  src={selectedUser.imageUrl ? selectedUser.imageUrl : "https://static.vecteezy.com/system/resources/thumbnails/007/296/447/small_2x/user-icon-in-flat-style-person-icon-client-symbol-vector.jpg"}
                  alt="User"
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />

                <strong>{selectedUser.name || selectedUser.user}</strong>
              </div>

              <div
                className="chat-messages mb-3"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                {chatMessages.map((chat) => {
                  const isMe =
                    chat.senderId === (currentUser?._id || currentUser?.userid);
                  return (
                    <div
                      key={chat._id}
                      style={{
                        width: "fit-content",
                        marginLeft: isMe ? "auto" : "0",
                        padding: "6px 10px",
                        borderRadius: "15px",
                        backgroundColor: isMe ? "blue" : "silver",
                        color: isMe ? "white" : "black",
                        marginBottom: "5px",
                      }}
                    >
                      <p className="mb-1">{chat.message}</p>
                      <small className="text-muted">
                        {chat.createdAt
                          ? new Date(chat.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                          : ""}
                      </small>
                      <div ref={messagesEndRef} />
                    </div>

                  );
                })}
              </div>

              {/* Message input */}
              <form onSubmit={handleSendMessage}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary">
                    <FaArrowRight />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
