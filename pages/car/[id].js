import { db } from "/firebase";
import Header from "/components/Header";
import Carousel from "../../components/Carousel";
import { BsDot } from "react-icons/bs";
import { MdOutlineLocalGasStation } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GiGearStickPattern, GiPathDistance } from "react-icons/gi";
import { BiTachometer } from "react-icons/bi";

function Details({ product }) {
  console.log(product.model);
  return (
    <div>
      <Header />

      <Carousel product={product} />
      <div className="max-w-7xl m-auto px-2">
        <h1 className="text-xl md:text-3xl font-bold flex items-center">
          {product.make} {product.model}{" "}
          <BsDot className="mx-2 text-blue-600 h-3 w-3" /> £{product.price}
        </h1>
        <p className="text-xs text-gray-500 flex items-center">
          {product.timestamp}
        </p>
      </div>

      <div className="flex flex-wrap justify-around sm:w-full max-w-7xl m-auto">
        <div className="w-32 flex flex-col items-center  py-2 bg-white rounded-lg shadow-lg tracking-wide ring-1 ring-gray-100  hover:bg-gray-100 mt-2 text-xs divide-y divide-fuchsia-500  text-center m-auto">
          <MdOutlineLocalGasStation className="h-6 w-6" />
          <a>{product.fuel}</a>
        </div>
        <div className="w-32 flex flex-col items-center py-2 bg-white rounded-lg shadow-lg tracking-wide ring-1 ring-gray-100 hover:bg-gray-100 mt-2 text-xs divide-y divide-fuchsia-500  text-center m-auto">
          <GiGearStickPattern className="h-6 w-6" />
          <a>{product.gearbox}</a>
        </div>
        <div className="w-32 flex flex-col items-center py-2 bg-white rounded-lg shadow-lg tracking-wide ring-1 ring-gray-100 hover:bg-gray-100 mt-2 text-xs divide-y divide-fuchsia-500  text-center m-auto">
          <BiTachometer className="h-6 w-6" />
          <a>{product.horsepower}hp</a>
        </div>
        <div className="w-32 flex flex-col items-center py-2 bg-white rounded-lg shadow-lg tracking-wide ring-1 ring-gray-100 hover:bg-gray-100 mt-2 text-xs divide-y divide-fuchsia-500  text-center m-auto">
          <GiPathDistance className="h-6 w-6" />
          <a>{product.kilometers}km</a>
        </div>
        <div className="w-32 flex flex-col items-center py-2 bg-white rounded-lg shadow-lg tracking-wide ring-1 ring-gray-100 hover:bg-gray-100 mt-2 text-xs divide-y divide-fuchsia-500  text-center m-auto">
          <HiOutlineLocationMarker className="h-6 w-6" />
          <a>{product.location}</a>
        </div>
      </div>

      <div className="max-w-7xl m-auto p-2 ring-1 ring-gray-100 mb-4 shadow-lg mt-2">
        <h1 className="text-xl font-bold">Description</h1>
        <p className="">{product.description}</p>
      </div>
    </div>
  );
}

export default Details;

export async function getServerSideProps(context) {
  const data = await db.collection("posts").doc(context.params?.id).get();
  return { props: { product: data.data() } };
}
