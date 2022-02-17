import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import {
  RiEBikeFill,
  RiRoadsterFill,
  RiTruckLine,
  RiSailboatLine,
} from "react-icons/ri";
import { FaTractor, FaShuttleVan, FaCaravan } from "react-icons/fa";

function Header() {
  const [session] = useSession();
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-md">
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
        <div className="flex items-center">
          {session ? (
            <>
              <p className="hidden lg:block text-xs text-gray-500 mr-2">
                {session.user.name}
              </p>
              <img
                className="rounded-full h-8 cursor-pointer transition duration-150 transform hover:scale-110"
                src={session.user.image}
                onClick={signOut}
              />
            </>
          ) : (
            <button
              className="text-sm text-gray-500 hover:bg-gray-100 leading-6 py-1 px-3 md:px-5 rounded-lg ring-1 ring-gray-100 ring-inset shadow-md"
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
