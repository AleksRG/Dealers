import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { RiHome2Line } from "react-icons/ri";
import { IoMdAddCircleOutline, IoMdLogOut } from "react-icons/io";
import { useRouter } from "next/router";
function ProfileButton() {
  const [session] = useSession();
  const router = useRouter();
  return (
    <div className="flex items-center">
      {session ? (
        <>
          <div>
            <Menu as="div" className="text-right xl:w-40 relative inline-block">
              <div>
                <Menu.Button>
                  <img
                    className="rounded-full h-8 w-8 cursor-pointer mt-1.5 focus:outline-none bg-white ring-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    src={session.user.image}
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 xl:right-auto w-40 mt-2 origin-top-right bg-white/75 divide-y divide-gray-100 shadow-lg focus:outline-none ring-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <div className="px-1 py-1 space-y-1">
                    <Menu.Item>
                      <button className="inline-flex w-full px-4 py-2 text-xs rounded-md hover:text-white space-x-2 text-gray-400 cursor-default text-center items-center">
                        <RiHome2Line className="h-5 w-5" />
                        <p className="">PROFILE</p>
                      </button>
                    </Menu.Item>{" "}
                    <Menu.Item>
                      <button
                        className="inline-flex w-full px-4 py-2 text-xs rounded-md hover:bg-sky-400/50 hover:text-white space-x-2 text-center items-center"
                        onClick={() => router.push("/add")}
                      >
                        <IoMdAddCircleOutline className="h-5 w-5" />
                        <p className="">ADD ITEM</p>
                      </button>
                    </Menu.Item>{" "}
                  </div>{" "}
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      <button
                        className="inline-flex w-full px-4 py-2 text-xs rounded-md hover:bg-sky-400/50 hover:text-white space-x-2 text-center items-center"
                        onClick={signOut}
                      >
                        <IoMdLogOut className="h-5 w-5" />
                        <p className="">LOG OUT</p>
                      </button>
                    </Menu.Item>{" "}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </>
      ) : (
        <button
          className="text-sm hover:bg-gray-100 leading-6 py-1 px-3 md:px-5 rounded-lg ring-1 ring-gray-100 ring-inset"
          onClick={signIn}
        >
          Log in
        </button>
      )}
    </div>
  );
}

export default ProfileButton;
