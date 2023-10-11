import { Link } from "react-router-dom";
import VerifiedBadge from "./common/VerifiedBadge";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import SuggestedProfileItem from "./SuggestedProfileItem";

const suggestedProfilesData = [
  {
    id: 1,
    username: "Elon Musk",
    userHandle: "@elonmusk",
    image:
      "https://i.pinimg.com/736x/18/fd/64/18fd644e9cdf81ab785d606584a384fb.jpg",
    isVerified: true,
  },
  {
    id: 2,
    username: "Alice Smith",
    userHandle: "@alicesmith",
    image: "Avatar.svg",
    isVerified: true,
  },
  {
    id: 3,
    username: "Emma Johnson",
    userHandle: "@emmajohnson",
    image: "Avatar.svg",
    isVerified: false,
  },
  {
    id: 4,
    username: "Michael Brown",
    userHandle: "@michaelbrown",
    image: "Avatar.svg",
    isVerified: false,
  },
  {
    id: 5,
    username: "Malak",
    userHandle: "@malak",
    image:
      "https://scontent.fczl2-2.fna.fbcdn.net/v/t39.30808-1/384115666_347269291280204_2615027445168736349_n.jpg?stp=dst-jpg_s200x200&_nc_cat=103&ccb=1-7&_nc_sid=fe8171&_nc_ohc=tQW-3wsFWZQAX82Xec-&_nc_ht=scontent.fczl2-2.fna&oh=00_AfACma00hD463Iyq66JQjEVwZBi9YIv1VIbw-jSeLzV6iw&oe=6529AD5F",
    isVerified: true,
  },
];

const SuggestedProfiles = () => {
  return (
    <div className="mb-10 bg-[#F6F9F8] dark:bg-white/5 p-5 rounded-2xl">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-5">
        <h3 className="font-bold text-xl capitalize">Profiles to follow</h3>
        <Link
          to="/discover"
          className="text-[14px] text-[#1D9AF1] hover:underline"
        >
          View All
        </Link>
      </div>
      {/* Suggested Profiles */}
      <ul className="flex flex-col gap-4">
        {suggestedProfilesData.map((profile) => (
          <SuggestedProfileItem key={profile.id} {...profile} />
        ))}
      </ul>
    </div>
  );
};
export default SuggestedProfiles;
