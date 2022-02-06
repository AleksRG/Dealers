import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import {
  RiEBikeFill,
  RiRoadsterFill,
  RiTruckLine,
  RiSailboatLine,
  RiLoginCircleLine,
} from "react-icons/ri";
import {
  FaTractor,
  FaShuttleVan,
  FaCaravan,
  FaRegUserCircle,
} from "react-icons/fa";

function Header() {
  const [session] = useSession();
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 bg-[#ffffff] border-b shadow-md">
      <div className="flex justify-between object-contain p-2 border-gray-300 h-11 items-center max-w-[1800px] m-auto">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap"
          rel="stylesheet"
        />
        <a
          className="text-2xl md:text-3xl font-satisfy font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          dealers
        </a>

        <div className="flex text-2xl space-x-2 ">
          <RiEBikeFill
            className="cursor-pointer transition duration-100 transform hover:scale-125"
            onClick={() => router.push("/moto")}
          />
          <RiRoadsterFill
            className="text-gray-300 transition duration-100 transform hover:scale-125"
            /*  onClick={() => router.push("/moto")} */
          />
          <FaShuttleVan
            className="text-gray-300 transition duration-100 transform hover:scale-125"
            /* onClick={() => router.push("/moto")} */
          />
          <RiTruckLine
            className="text-gray-300 transition duration-100 transform hover:scale-125"
            /* onClick={() => router.push("/moto")} */
          />
          <FaTractor
            className="text-gray-300 transition duration-100 transform hover:scale-125"
            /* onClick={() => router.push("/moto")} */
          />
          <RiSailboatLine
            className="text-gray-300 transition duration-100 transform hover:scale-125"
            /* onClick={() => router.push("/moto")} */
          />
          <FaCaravan
            className="text-gray-300 transition duration-100 transform hover:scale-125"
            /* onClick={() => router.push("/moto")} */
          />
        </div>
        <div className="flex items-center">
          {session ? (
            <img
              className="rounded-full h-8 cursor-pointer transition duration-150 transform hover:scale-110"
              src={session.user.image}
              onClick={signOut}
            />
          ) : (
            /* <RiLoginCircleLine
              className="text-2xl cursor-pointer transition duration-150 transform hover:scale-110"
              onClick={signIn}
            /> */
            <button
              className=" text-sm text-gray-500 hover:bg-gray-100 leading-6 py-1 px-5 rounded-lg ring-1 ring-gray-100 ring-inset shadow-md"
              onClick={signIn}
            >
              Log in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
