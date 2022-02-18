import { useRouter } from "next/dist/client/router";
import {
  RiEBikeFill,
  RiRoadsterFill,
  RiTruckLine,
  RiSailboatLine,
} from "react-icons/ri";
import { FaTractor, FaShuttleVan, FaCaravan } from "react-icons/fa";
import ProfileButton from "./ProfileButton";

function Header() {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-md">
      <div className="flex justify-between object-contain p-2 border-gray-300 h-11 items-center max-w-[1700px] m-auto">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap"
          rel="stylesheet"
        />
        <a
          className="text-2xl sm:text-3xl font-satisfy font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          dealers
        </a>

        <div className="flex text-2xl space-x-2">
          <RiEBikeFill
            className="cursor-pointer transition duration-100 transform hover:scale-125"
            onClick={() => router.push("/motors")}
          />
          <RiRoadsterFill
            className="cursor-pointer transition duration-100 transform hover:scale-125"
            onClick={() => router.push("/cars")}
          />
          <FaShuttleVan className="text-gray-300 transition duration-100 transform hover:scale-125" />
          <RiTruckLine className="text-gray-300 transition duration-100 transform hover:scale-125" />
          <FaTractor className="text-gray-300 transition duration-100 transform hover:scale-125" />
          <RiSailboatLine className="text-gray-300 transition duration-100 transform hover:scale-125" />
          <FaCaravan className="text-gray-300 transition duration-100 transform hover:scale-125" />
        </div>

        <ProfileButton />
      </div>
    </div>
  );
}

export default Header;
