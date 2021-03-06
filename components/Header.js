import React from "react";
import {
  RiEBikeFill,
  RiRoadsterFill,
  RiTruckLine,
  RiSailboatLine,
} from "react-icons/ri";
import { FaTractor, FaShuttleVan, FaCaravan } from "react-icons/fa";
import ProfileButton from "./ProfileButton";
import Link from "next/link";

function Header({ activ }) {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex justify-between object-contain p-2 h-10 items-center max-w-[1700px] m-auto">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap"
          rel="stylesheet"
        />
        <Link href="/">
          <a className="text-2xl sm:text-3xl font-satisfy font-bold cursor-pointer">
            dealers
          </a>
        </Link>

        <div className="flex text-2xl space-x-2">
          <Link href="/motors">
            <a className="cursor-pointer transition duration-100 transform hover:scale-125">
              <RiEBikeFill
                className={`${
                  activ === "motors" ? "text-sky-400" : "text-gray-900"
                }`}
              />
            </a>
          </Link>
          <Link href="/cars">
            <a className="cursor-pointer transition duration-100 transform hover:scale-125">
              <RiRoadsterFill
                className={`${
                  activ === "cars" ? "text-sky-400" : "text-gray-900"
                }`}
              />
            </a>
          </Link>
          <Link href="/vans">
            <a className="cursor-pointer transition duration-100 transform hover:scale-125">
              <FaShuttleVan
                className={`${
                  activ === "vans" ? "text-sky-400" : "text-gray-900"
                }`}
              />
            </a>
          </Link>
          <Link href="/trucks">
            <a className="cursor-pointer transition duration-100 transform hover:scale-125">
              <RiTruckLine
                className={`${
                  activ === "trucks" ? "text-sky-400" : "text-gray-900"
                }`}
              />
            </a>
          </Link>

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
