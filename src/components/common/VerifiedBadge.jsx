import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import personalBadgeSmall from "../../assets/personalAccountBadge_small.svg";
import personalBadgeBig from "../../assets/personalAccountBadge_big.svg";
import businessBadgeSmall from "../../assets/businessAccountBadge_small.svg";
import businessBadgeBig from "../../assets/businessAccountBadge_big.svg";

const VerifiedBadge = ({ size, type }) => {
  if (size === "small" && type === "personal") {
    return (
      <div>
        <img src={personalBadgeSmall} alt="verified" />
      </div>
    );
  } else if (size === "big" && type === "personal") {
    return (
      <div>
        <img src={personalBadgeBig} alt="verified" />
      </div>
    );
  } else if (size === "small" && type === "business") {
    return (
      <div>
        <img src={businessBadgeSmall} alt="verified" />
      </div>
    );
  } else if (size === "big" && type === "business") {
    return (
      <div>
        <img src={businessBadgeBig} alt="verified" />
      </div>
    );
  }
};

VerifiedBadge.defaultProps = {
  size: "small",
};

export default VerifiedBadge;
