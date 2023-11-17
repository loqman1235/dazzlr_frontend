import VerifiedBadge from "./common/VerifiedBadge";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const Conversation = ({ _id, participants, latestMessage }) => {
  const socket = useContext(SocketContext);
  const { user } = useSelector((state) => state.auth);
  const [arrivalMsg, setArrivalMsg] = useState(latestMessage);
  const [isConversationActive, setIsConversationActive] = useState(false);

  const userOfConvo = participants.find((u) => u?._id !== user?._id);

  useEffect(() => {
    if (socket) {
      socket.on("updateLatestMessage", (data) => {
        if (data.convoId === _id) {
          console.log("Updating arrivalMsg for convo:", data?.convoId);
          setArrivalMsg(data?.latestMessage);
          setIsConversationActive(true);
        }
      });
    }

    return () => socket?.off("updateLatestMessage");
  }, [socket, _id]);

  console.log(isConversationActive, "Is Conversation Active");

  return (
    <NavLink
      to={`/messages/${_id}`}
      className={(navData) => {
        if (navData.isActive) {
          return "convo-link active group/convo";
        } else if (isConversationActive) {
          return "convo-link group/convo convo-link-new-message";
        } else {
          return "convo-link group/convo";
        }
      }}
      onClick={() => setIsConversationActive(false)}
    >
      {/* Profile Picture and user details */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-500">
          <img
            src={userOfConvo?.avatar?.url}
            alt={userOfConvo?.fullname}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1">
                  <h3 className="text-[15px] font-bold ">
                    {userOfConvo?.fullname}
                  </h3>
                  <span>
                    {userOfConvo?.isVerified && (
                      <VerifiedBadge
                        size="small"
                        type={userOfConvo?.accountType}
                      />
                    )}
                  </span>
                </div>
              </div>
              <span className="text-[#536471] dark:text-[#A0A0A0] text-[15px] flex items-center gap-2">
                {userOfConvo?.userHandler}
                {/* <span className="text-xs">&#x2022;</span> */}
                {/* <TimeAgo date={Date.now()} /> */}
              </span>
            </div>
            {/* Conversation settings button */}
            <button
              className="post-btn hover:bg-[#1D9AF1]/10 hover:text-[#1D9AF1] opacity-0 group-hover/convo:opacity-100 transition"
              onClick={(e) => e.preventDefault()}
            >
              <BiDotsHorizontalRounded size={20} />
            </button>
          </div>
          {arrivalMsg && (
            <p className="text-sm">
              {arrivalMsg.length > 20
                ? arrivalMsg.slice(0, 5) + "..."
                : arrivalMsg}
            </p>
          )}
        </div>
      </div>
    </NavLink>
  );
};
export default Conversation;
