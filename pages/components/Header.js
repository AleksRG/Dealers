import { getSession, signIn, signOut, useSession } from "next-auth/client";
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
    <div className="flex justify-between bg-white object-contain p-3.5 border-b border-gray-300 h-12 items-center">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap"
        rel="stylesheet"
      />
      <a
        className="text-3xl font-satisfy font-bold cursor-pointer"
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
          className="cursor-pointer transition duration-100 transform hover:scale-125"
          onClick={() => router.push("/moto")}
        />
        <FaShuttleVan
          className=" cursor-pointer transition duration-100 transform hover:scale-125"
          onClick={() => router.push("/moto")}
        />
        <RiTruckLine
          className="cursor-pointer transition duration-100 transform hover:scale-125"
          onClick={() => router.push("/moto")}
        />
        <FaTractor
          className="cursor-pointer transition duration-100 transform hover:scale-125"
          onClick={() => router.push("/moto")}
        />
        <RiSailboatLine
          className="cursor-pointer transition duration-100 transform hover:scale-125"
          onClick={() => router.push("/moto")}
        />
        <FaCaravan
          className="cursor-pointer transition duration-100 transform hover:scale-125"
          onClick={() => router.push("/test")}
        />
        <RiSettings3Fill
          className="cursor-pointer transition duration-100 transform hover:scale-125"
          onClick={() => router.push("/test")}
        />
      </div>

      <div className="flex items-center">
        {session ? (
          <>
            <h2>Welcome {session.user.name}</h2>
            <button
              className="border border-gray-300 m-0.5 rounded-sm px-4 py-2 w-max hover:shadow active:scale-90 transition duration-150 bg-transparent text-sm hover:bg-[#f4f7f61a]"
              onClick={signOut}
            >
              Sign Out
            </button>
            <img
              className="rounded-full h-10 cursor-pointer transition duration-150 transform hover:scale-110"
              src={session.user.image}
            />
          </>
        ) : (
          <button
            className="border border-gray-300 m-0.5 rounded-sm px-4 py-2 w-max hover:shadow active:scale-90 transition duration-150 bg-transparent text-sm hover:bg-[#f4f7f61a]"
            onClick={signIn}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
