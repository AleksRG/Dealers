import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

import {
  RiEBikeFill,
  RiRoadsterFill,
  RiTruckLine,
  RiSailboatLine,
  RiSettings3Fill,
} from "react-icons/ri";
import { FaTractor, FaShuttleVan, FaCaravan } from "react-icons/fa";

function Header() {
  const [session] = useSession();
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 bg-[#ffffff] border-b shadow-md">
      <div className="  flex justify-between object-contain p-3.5 border-gray-300 h-12 items-center max-w-7xl m-auto">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap"
          rel="stylesheet"
        />
        <a
          className="text-xl md:text-3xl font-satisfy font-bold cursor-pointer"
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
          <RiSettings3Fill
            className="text-gray-300 transition duration-100 transform hover:scale-125"
            /*  onClick={() => router.push("/moto")} */
          />
        </div>

        <div className="flex items-center">
          {session ? (
            <>
              <h2 className="hidden md:inline font-satisfy text-xl font-bold">
                welcome {/* {session.user.name} */}
              </h2>
              {/* {
              <button
                className="border border-gray-300 m-0.5 rounded-sm px-4 py-2 w-max hover:shadow active:scale-90 transition duration-150 bg-transparent text-sm hover:bg-[#f4f7f61a]"
                onClick={signOut}
              >
                Sign Out
              </button>
            } */}
              <img
                className="rounded-full h-8 md:h-10 cursor-pointer transition duration-150 transform hover:scale-110"
                src={session.user.image}
                onClick={signOut}
              />
            </>
          ) : (
            <>
              <button
                className="border border-blue-400 m-0.5 rounded px-4 py-2 w-max hover:shadow active:scale-90 transition duration-150 bg-transparent text-sm hover:bg-[#f4f7f61a]"
                onClick={signIn}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
