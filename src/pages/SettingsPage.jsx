import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";

const SettingsPage = () => {
  return (
    <div className="w-full md:w-[60%] relative pb-20">
      <div className="w-full z-20 p-5 border-b border-b-black/10 dark:border-b-white/10 bg-[#FEFFFE]/80 dark:bg-[#0A0E28]/80 backdrop-blur-lg sticky top-0">
        <h2 className="font-bold text-xl">Settings</h2>
      </div>

      <div className="p-5 w-full flex flex-col gap-5 h-screen">
        {/* Profile Settings */}
        <div>
          <h3 className="mb-4 font-semibold text-lg">Profile</h3>
          <Link
            to="/settings/profile"
            className="flex items-center justify-between p-4 bg-[#0A0E28]/5 dark:bg-white/5 hover:bg-[#0A0E28]/10 dark:hover:bg-white/10 rounded-lg text-[15px] dark:shadow transition"
          >
            <p>Edit Profile</p>
            <div className="flex items-center gap-2 ">
              <span className="dark:text-[#A0A0A0] text-[#536471]">
                Axel Djefafla
              </span>
              <span className="dark:text-[#A0A0A0] text-[#536471]">
                <BiChevronRight size={24} />
              </span>
            </div>
          </Link>
        </div>
        {/* Privacy Settings */}
        <div>
          <h3 className="mb-4 font-semibold text-lg">Privacy</h3>
          <ul className="flex flex-col gap-1">
            <Link
              to="/settings/profile"
              className="flex items-center justify-between p-4 bg-[#0A0E28]/5 dark:bg-white/5 hover:bg-[#0A0E28]/10 dark:hover:bg-white/10 rounded-lg text-[15px] dark:shadow transition"
            >
              <p>Mutes</p>
              <div className="flex items-center gap-2 ">
                <span className="dark:text-[#A0A0A0] text-[#536471]">
                  <BiChevronRight size={24} />
                </span>
              </div>
            </Link>
            <Link
              to="/settings/profile"
              className="flex items-center justify-between p-4 bg-[#0A0E28]/5 dark:bg-white/5 hover:bg-[#0A0E28]/10 dark:hover:bg-white/10 rounded-lg text-[15px] dark:shadow transition"
            >
              <p>Blocks</p>
              <div className="flex items-center gap-2 ">
                <span className="dark:text-[#A0A0A0] text-[#536471]">
                  <BiChevronRight size={24} />
                </span>
              </div>
            </Link>
          </ul>
        </div>
        {/* Security Settings */}
        <div>
          <h3 className="mb-4 font-semibold text-lg">Security</h3>
          <ul className="flex flex-col gap-1">
            <Link
              to="/settings/profile"
              className="flex items-center justify-between p-4 bg-[#0A0E28]/5 dark:bg-white/5 hover:bg-[#0A0E28]/10 dark:hover:bg-white/10 rounded-lg text-[15px] dark:shadow transition"
            >
              <p>Change Email</p>
              <div className="flex items-center gap-2 ">
                <span className="dark:text-[#A0A0A0] text-[#536471]">
                  <BiChevronRight size={24} />
                </span>
              </div>
            </Link>
            <Link
              to="/settings/profile"
              className="flex items-center justify-between p-4 bg-[#0A0E28]/5 dark:bg-white/5 hover:bg-[#0A0E28]/10 dark:hover:bg-white/10 rounded-lg text-[15px] dark:shadow transition"
            >
              <p>Change Password</p>
              <div className="flex items-center gap-2 ">
                <span className="dark:text-[#A0A0A0] text-[#536471]">
                  <BiChevronRight size={24} />
                </span>
              </div>
            </Link>
          </ul>
        </div>
        {/* Other Settings */}
        <div>
          <h3 className="mb-4 font-semibold text-lg">Other</h3>
          <ul className="flex flex-col gap-1">
            <Link
              to="/settings/profile"
              className="flex items-center justify-between p-4 bg-red-700/10 dark:bg-red-700/10 hover:bg-red-700/20 dark:hover:bg-red-700/20 rounded-lg text-[15px] dark:shadow transition"
            >
              <p className="text-red-700">Delete account</p>
              <div className="flex items-center gap-2 ">
                <span className="text-red-700">
                  <BiChevronRight size={24} />
                </span>
              </div>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
