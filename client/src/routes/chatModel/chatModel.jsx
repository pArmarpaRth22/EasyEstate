import { useState, useEffect, useRef } from "react";
import "./chatModal.scss";
import { useContext } from "react";
import { AuthContext } from "./../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "./../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";

function ChatModal({ postId, onClose }) {
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const messageEndRef = useRef();

  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await apiRequest.get("/chats");
        setChats(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (currentUser) {
      fetchChats();
    }
  }, [currentUser]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;

    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const readMessages = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          readMessages();
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("getMessage");
      }
    };
  }, [socket, chat]);

  return (
    <div className="chatModal">
      <div className="chat">
        <div className="messages">
          <h1>Messages</h1>
          {chats.map((c) => (
            <div
              className="message"
              key={c.id}
              style={{
                backgroundColor:
                  c.seenBy.includes(currentUser.id) || chat?.id === c.id
                    ? "white"
                    : "#fecd514e",
              }}
              onClick={() => handleOpenChat(c.id, c.receiver)}
            >
              <img src={c.receiver.avatar || "/image.png"} alt="" />
              <span>{c.receiver.username}</span>
              <p>{c.lastMessage}</p>
            </div>
          ))}
        </div>
        {chat && (
          <div className="chatBox">
            <div className="top">
              <div className="user">
                <img src={chat.receiver.avatar || "/image.png"} alt="" />
                {chat.receiver.username}
              </div>
              <span className="close" onClick={onClose}>
                X
              </span>
            </div>
            <div className="center">
              {chat.messages.map((message) => (
                <div
                  className="chatMessage own"
                  key={message.id}
                  style={{
                    alignSelf:
                      message.userId === currentUser.id
                        ? "flex-end"
                        : "flex-start",
                    textAlign:
                      message.userId === currentUser.id ? "right" : "left",
                  }}
                >
                  <p>{message.text}</p>
                  <span>{format(message.createdAt)}</span>
                </div>
              ))}
              <div ref={messageEndRef}></div>
            </div>
            <form onSubmit={handleSend} className="bottom">
              <textarea name="text"></textarea>
              <button>Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatModal;
