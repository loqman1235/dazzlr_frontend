import {
  BiSolidCrown,
  BiSolidTrophy,
  BiSolidStar,
  BiSolidFlame,
  BiSolidBulb,
} from "react-icons/bi";

const LevelBadge = ({ points }) => {
  let badgeText = "";
  let badgeColor = "";
  let textColor = "";
  let badgeIcon = null;

  if (points <= 100) {
    badgeText = "Rising Star";
    badgeColor = "bg-gradient-to-tr from-[#F46F36] to-[#FF5722]";
    textColor = "text-white";
    badgeIcon = <BiSolidStar size={14} />;
  } else if (points <= 500) {
    badgeText = "Radiant Beacon";
    badgeColor = "bg-gradient-to-tr from-[#FFC107] to-[#FF9800]";
    textColor = "text-[#0A0E28]";
    badgeIcon = <BiSolidFlame size={14} />;
  } else if (points <= 1000) {
    badgeText = "Dazzling Luminary";
    badgeColor = "bg-gradient-to-tr from-[#FF9800] to-[#FF5722]";
    textColor = "text-white";
    badgeIcon = <BiSolidBulb size={14} />;
  } else if (points <= 5000) {
    badgeText = "Brilliance Achiever";
    badgeColor = "bg-gradient-to-tr from-[#FF5722] to-[#F44336]";
    textColor = "text-white";
    badgeIcon = <BiSolidTrophy size={14} />;
  } else {
    badgeText = "Luminous Legend";
    badgeColor = "bg-gradient-to-tr from-[#F44336] to-[#D32F2F]";
    textColor = "text-white";
    badgeIcon = <BiSolidCrown size={14} />;
  }

  return (
    <div
      className={`text-xs px-3 py-1 flex items-center gap-1 font-semibold rounded-full whitespace-nowrap ${badgeColor} w-fit ${textColor}`}
    >
      {badgeIcon} {badgeText}
    </div>
  );
};

export default LevelBadge;
