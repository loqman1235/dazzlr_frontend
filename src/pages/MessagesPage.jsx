import {
  PencilSquareIcon,
  Cog8ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Conversation from "../components/Conversation";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MessagesPage = () => {
  const [convos, setConvos] = useState([]);

  const fetchUserConvos = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/convos`,
        {
          withCredentials: true,
        }
      );

      setConvos(res.data.convos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserConvos();
  }, []);

  return (
    <div className="w-full flex">
      <div className="w-full md:w-2/5 h-screen overflow-y-auto border-r-black/10 dark:border-r-white/10 border-r-[0.1px] ">
        {/* header */}
        <div className="w-full p-5 flex items-center justify-between bg-[#FEFFFE]/80 dark:bg-[#101010]/80 backdrop-blur-lg sticky top-0 z-20">
          <h2 className="font-bold text-xl">Messages</h2>
          <div className="flex items-center gap-5">
            <button className="text-[#536471] dark:text-[#A0A0A0]">
              <Cog8ToothIcon className="w-5 h-5" />
            </button>
            <button className="text-[#536471] dark:text-[#A0A0A0]">
              <PencilSquareIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search messages */}
        <div className="w-full p-5">
          <form className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search Messages"
              className="w-full py-3 px-5 outline-none border-none bg-black/5 dark:bg-white/5 rounded-full text-sm shadow"
            />
            <button className="absolute right-5 top-1/2 -translate-y-1/2 text-[#536471] dark:text-[#A0A0A0] ">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
        {/* Coversations */}
        <div>
          {convos.length > 0 &&
            convos.map((convo) => <Conversation key={convo._id} {...convo} />)}
        </div>
      </div>

      <div className="hidden md:block w-3/5 h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};
export default MessagesPage;
