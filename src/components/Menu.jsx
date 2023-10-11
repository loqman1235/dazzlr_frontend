import { Link, NavLink, useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

import {
  BiHomeAlt,
  BiCompass,
  BiBell,
  BiEnvelope,
  BiGroup,
  BiUser,
  BiCog,
  BiLogOutCircle,
  BiDotsHorizontalRounded,
  BiPlus,
  BiImageAlt,
  BiSmile,
  BiPoll,
} from "react-icons/bi";

import MenuItem from "./MenuItem";
import Brand from "./common/Brand";
import ThemeToggle from "./common/ThemeToggle";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../features/authSlice";

import CreatePost from "./CreatePost";
import { resetUserPosts, toggleCreatePostModal } from "../features/postSlice";

const Menu = () => {
  const { postModalHidden } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAsync()).then(() => {
      dispatch(resetUserPosts());
      navigate("/login");
    });
  };

  const togglePostModal = () => {
    dispatch(toggleCreatePostModal(!postModalHidden));
  };

  useEffect(() => {
    if (!postModalHidden) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [postModalHidden]);

  return (
    <>
      <div className="flex flex-col menu h-screen md:h-screen w-[80px] md:w-[280px] border-r-black/10 dark:border-r-white/10 border-r-[0.1px]  fixed left-0 bottom-0 p-5  bg-[#FEFFFE]/80 dark:bg-[#0A0E28]/80 backdrop-blur-md z-50">
        <div className="flex flex-col md:flex-row gap-5 items-center justify-between w-full mb-10">
          <Brand />
          <ThemeToggle />
        </div>

        {/* Menu items */}
        <ul className="mt-auto md:mt-0 h-full md:h-auto flex flex-col items-center  gap-8">
          <MenuItem title="home" to="/home" Icon={BiHomeAlt} />
          <MenuItem title="explore" to="/explore" Icon={BiCompass} />
          <MenuItem title="notifications" to="/notifications" Icon={BiBell} />
          <MenuItem title="messages" to="/messages" Icon={BiEnvelope} />
          {/* <MenuItem title="communities" to="/communities" Icon={BiGroup} /> */}
          <MenuItem title="profile" to={`${user?.userHandler}`} Icon={BiUser} />
          <MenuItem title="settings" to="/settings" Icon={BiCog} />
          <li className="w-full flex items-center justify-center md:block">
            <button className="menu-link" onClick={handleLogout}>
              <span>
                <BiLogOutCircle size={24} />
              </span>
              <span className="hidden md:block">Logout</span>
            </button>
          </li>

          {/* <li style={{ flex: "1" }}></li> */}
          <div className="w-full mt-auto md:mt-0">
            <button
              className="w-10 h-10 md:h-auto rounded-full flex items-center justify-center md:btn btn-primary md:w-full"
              onClick={togglePostModal}
            >
              <span className="md:hidden flex items-center justify-center">
                <BiPlus size={24} />
              </span>{" "}
              <span className="hidden md:block">Post</span>
            </button>
          </div>
        </ul>
      </div>
      {/* Create post modal */}
      <div
        className={`shadow-2xl inset-0 w-full h-screen bg-black/50 dark:bg-white/50 fixed top-0 left-0 z-50 backdrop-blur items-center justify-center ${
          postModalHidden ? "hidden" : "flex"
        }`}
        onClick={togglePostModal}
      >
        <div
          className="w-[580px] bg-[#FEFFFE] dark:bg-[#0A0E28] rounded-2xl p-5 flex items-start gap-5"
          onClick={(e) => e.stopPropagation()}
          id="modalBox"
        >
          <CreatePost />
        </div>
      </div>
    </>
  );
};
export default Menu;
