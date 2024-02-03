import { io } from "socket.io-client";
import { useEffect, useState, createContext } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to Socket.io server");
    });

    return () => {
      newSocket.disconnect();
      console.log("Disconnected from Socket.io server");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
