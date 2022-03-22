import { MdOutlineLocalGasStation } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GiGearStickPattern, GiPathDistance } from "react-icons/gi";
import { BiTachometer } from "react-icons/bi";
import { BsDot } from "react-icons/bs";

function Post({
  username,
  make,
  model,
  price,
  description,
  imageUrl,
  imageUrl2,
  imageUrl3,
  imageUrl4,
  timestamp,
  horsepower,
  year,
  kilometers,
  reference,
  gearbox,
  fuel,
  location,
}) {
  function seeMore(reference) {
    window.open(`/car/${reference}`);
  }
  return (
    <main className="pb-6 sm:p-6 md:py-6 md:px-2 border-b border-bluegray-100 max-w-6xl m-auto">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-10 xl:gap-x-20 lg:grid-cols-2">
        <div className="px-2 sm:px-2 col-start-1 self-center row-start-3 flex flex-col-reverse sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
          <h1 className="leading-4 text-md font-semibold text-gray-900 md:text-2xl ">
            {make} {model}{" "}
          </h1>
          <p className="text-xs mt-2 mb-0.5 md:text-sm leading-4 font-semibold text-gray-900 ">
            Selling price £{price}
          </p>
        </div>
        <div className="grid gap-4 col-start-1 sm:px-2 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-1 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
          <img
            src={imageUrl}
            alt=""
            className="w-full  h-60 object-cover sm:rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full"
            loading="lazy"
          />
          <img
            src={imageUrl2}
            alt=""
            className="hidden w-full h-52 object-cover rounded-lg sm:block sm:col-span-2 md:col-span-1 lg:row-start-2 lg:col-span-2 lg:h-32"
            loading="lazy"
          />
          <img
            src={imageUrl3}
            alt=""
            className="hidden w-full h-52 object-cover rounded-lg md:block lg:row-start-2 lg:col-span-2 lg:h-32"
            loading="lazy"
          />
        </div>

        <div className="mt-4 px-2 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2 text-gray-500  overflow-auto scrollbar-hide">
          <dt className="sr-only">Reviews</dt>
          <div className="flex items-center">
            <MdOutlineLocalGasStation className="h-5 w-5" />
            <span>{fuel}</span>
          </div>
          <div className="flex items-center">
            <BsDot className="mx-2 text-blue-600 h-3 w-3" />
            <GiGearStickPattern className="h-5 w-5" />
            <span>{gearbox}</span>
          </div>{" "}
          <div className="flex items-center">
            <BsDot className="mx-2 text-blue-600 h-3 w-3" />
            <BiTachometer className="h-5 w-5" />
            <span>{horsepower}hp</span>
          </div>
          <div className="flex items-center">
            <BsDot className="mx-2 text-blue-600 h-3 w-3" />
            <GiPathDistance className="h-5 w-5 " />
            <span>{kilometers}km</span>
          </div>
          <div className="flex items-center">
            <BsDot className="mx-2 text-blue-600 h-3 w-3" />
            <HiOutlineLocationMarker className="h-5 w-5 " />
            <span>{location}</span>
          </div>
        </div>
        <div className="px-2 mt-2 ml-auto col-start-1 row-start-3 self-center sm:ml-0 sm:mb-0 sm:col-start-2 sm:row-start-2 sm:row-span-2 lg:mt-4 lg:col-start-1 lg:row-start-3 lg:row-end-4 ">
          <button
            type="button"
            className="text-sm flex text-gray-500 hover:bg-gray-100 py-2 px-5 rounded-lg ring-1 ring-gray-100 ring-inset shadow-md"
            onClick={() => seeMore(reference)}
          >
            More info <p className="ml-1 text-sky-400">&rarr;</p>
          </button>
        </div>
        <p className="mt-2 px-2 text-sm leading-5 col-start-1 sm:col-span-2 lg:mt-4 lg:row-start-4 lg:col-span-1 text-gray-500 h-20 md:h-24 lg:h-44 overflow-hidden text-justify">
          {description}
        </p>
      </div>
    </main>
  );
}

export default Post;
