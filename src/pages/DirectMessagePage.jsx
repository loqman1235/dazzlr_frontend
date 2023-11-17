import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Message from "../components/Message";
import VerifiedBadge from "../components/common/VerifiedBadge";
import {
  InformationCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";

const DirectMessagePage = () => {
  const socket = useContext(SocketContext);
  const messagesContainerRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [convo, setConvo] = useState(null);
  const { convId } = useParams();
  const userOfConvo =
    convo?.participants.find((u) => u?._id !== user?._id) || null;

  // Socket
  useEffect(() => {
    // Add user
    socket?.emit("addUser", user?._id);
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (data) => {
        // setArrivalMessage({
        //   sender: data.senderId,
        //   receiver: data.receiverId,
        //   message: data.message,
        //   createdAt: Date.now(),
        // });
        const arrivalMsg = {
          _id: data._id,
          sender: data.senderId,
          receiver: data.receiverId,
          message: data.message,
          createdAt: Date.now(),
        };

        const isRelatedToConvo =
          arrivalMsg.sender === userOfConvo?._id ||
          arrivalMsg.receiver === userOfConvo?._id;

        if (isRelatedToConvo) {
          setMessages((prev) => [...prev, arrivalMsg]);
        }
      });
    }

    return () => socket?.off("getMessage");
  }, [socket, userOfConvo]);

  // Display arrivale message
  // useEffect(() => {
  //   if (arrivalMessage) {
  //     const isRelatedToConvo =
  //       arrivalMessage.sender === userOfConvo?._id ||
  //       arrivalMessage.receiver === userOfConvo?._id;

  //     if (isRelatedToConvo) {
  //       setMessages((prevMessages) => {
  //         const existingMessage = prevMessages.find(
  //           (msg) => msg.message === arrivalMessage.message
  //         );

  //         // Only add the message if it's not already in the state
  //         if (!existingMessage) {
  //           return [...prevMessages, arrivalMessage];
  //         }

  //         return prevMessages;
  //       });
  //     }
  //   }
  // }, [arrivalMessage, userOfConvo]);

  // Function to send a message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (socket) {
      socket.emit("sendMessage", {
        convoId: convId,
        senderId: user?._id,
        receiverId: userOfConvo?._id,
        message,
      });
    }

    try {
      const data = {
        convoId: convId,
        receiverId: userOfConvo?.id,
        message,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages`,
        data,
        { withCredentials: true }
      );
      fetchConvoMessages();
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = useCallback(
    (e) => {
      setMessage(e.target.value);
    },
    [setMessage]
  );

  // Function to fetch conversation messages
  const fetchConvoMessages = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages/${convId}`,
        { withCredentials: true }
      );

      setMessages(res.data.convoMessages);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch user conversation
  const fetchUserConvo = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/convos/${convId}`,
        {
          withCredentials: true,
        }
      );

      setConvo(res.data.convo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConvoMessages();
    fetchUserConvo();
  }, [convId]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      // Update scroll to the bottom after messages state updates
      messagesContainerRef.current.parentElement.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      className="flex flex-col justify-between h-full"
      ref={messagesContainerRef}
    >
      {/* Header */}
      <div className="w-full px-5 py-4 flex items-center justify-between  sticky top-0 z-10 bg-[#FEFFFE]/80 dark:bg-[#101010]/80 backdrop-blur-lg shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-500">
            <img
              src={userOfConvo?.avatar?.url}
              alt={userOfConvo?.fullname}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-1">
            <h3 className="text-[15px] font-bold ">{userOfConvo?.fullname}</h3>
            <span>
              {userOfConvo?.isVerified && (
                <VerifiedBadge size="small" type={userOfConvo?.accountType} />
              )}
            </span>
          </div>
        </div>
        <button className="">
          <InformationCircleIcon className="w-5 h-5 stroke-2" />
        </button>
      </div>

      {/* User Details */}
      <Link to={`/${userOfConvo?.userHandler}`} className="px-5 block">
        <div className="border-b border-b-black/10 dark:border-b-white/10 flex items-center justify-center flex-col gap-3 py-10 hover:bg-black/10 dark:hover:bg-white/10 transition">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-500">
            <img
              src={userOfConvo?.avatar?.url}
              alt={userOfConvo?.fullname}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h3 className="text-[15px] font-bold ">
                {userOfConvo?.fullname}
              </h3>
              <span>
                {userOfConvo?.isVerified && (
                  <VerifiedBadge size="small" type={userOfConvo?.accountType} />
                )}
              </span>
            </div>
            <span className="text-[#536471] dark:text-[#A0A0A0] text-[15px] flex items-center gap-2">
              {userOfConvo?.userHandler}
              {/* <span className="text-xs">&#x2022;</span> */}
              {/* <TimeAgo date={Date.now()} /> */}
            </span>
          </div>
        </div>
      </Link>

      {/* Messages */}
      <div className="p-5 w-full relative flex flex-col gap-3">
        {messages.length > 0 &&
          messages.map((message, index) => (
            <Message
              key={message._id}
              {...message}
              isLastMessage={index === messages.length - 1}
            />
          ))}
      </div>

      {/* Type message form */}
      <div className="w-full px-5 py-2 sticky bottom-0 border-t border-t-black/10 dark:border-t-white/10 bg-[#FEFFFE] dark:bg-[#101010]">
        <form className="relative" onSubmit={handleSendMessage}>
          <textarea
            name="msg"
            id="msg"
            placeholder="Start a new message"
            className="w-full bg-black/5 dark:bg-white/5 resize-none h-fit block px-5 pr-20 pt-5 rounded-2xl outline-none"
            onChange={handleChange}
            value={message}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevents the default behavior of creating a new line
                handleSendMessage(e); // Call the function to submit the form
              }
            }}
          ></textarea>
          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-[#1D9AF1] rounded-full text-white p-2 flex items-center justify-center disabled:opacity-50"
            disabled={message.length === 0}
            aria-label="send"
          >
            <PaperAirplaneIcon className="w-5 h-5 stroke-2" />
          </button>
        </form>
      </div>
    </div>
  );
};
export default DirectMessagePage;
