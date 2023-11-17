import { useSelector } from "react-redux";
import formatDate from "../helpers/formatDate";

const Message = ({ _id, sender, receiver, message, createdAt }) => {
  const { user } = useSelector((state) => state.auth);

  let isOwnMsg = sender?._id === user?._id;

  // list own messages and list other user messages then display the date only on the last message

  return (
    <div
      className={`flex flex-col gap-2 ${isOwnMsg ? "self-end" : "self-start"}`}
    >
      <div
        className={`p-4 w-fit rounded-3xl text-sm font-medium flex items-center justify-center  ${
          isOwnMsg
            ? "self-end bg-[#1D9AF1] dark:bg-[#1D9AF1] !rounded-br-md text-white"
            : "bg-black/10 dark:bg-white/20 rounded-bl-md text-[#101010] dark:text-white"
        }`}
      >
        {message}
      </div>
      {/* Message date */}
      <span
        className={`text-[13px] text-[#536471] dark:text-[#A0A0A0] ${
          isOwnMsg ? "text-right" : "text-left"
        }`}
      >
        {formatDate(createdAt)}
      </span>
    </div>
  );
};
export default Message;
