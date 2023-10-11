import { CheckBadgeIcon } from "@heroicons/react/24/solid";

const VerifiedBadge = ({ width, height }) => {
  return (
    <span className="text-[#1D9AF1]">
      <CheckBadgeIcon className={`${width} ${height}`} title="verified" />
      {/* <img src="CheckBadge.svg" alt="verified" /> */}
    </span>
  );
};

VerifiedBadge.defaultProps = {
  width: "w-5",
  height: "h-5",
};

export default VerifiedBadge;
