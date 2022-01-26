import { db } from "/firebase";
import Header from "/components/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { MdShareLocation, MdOutlineLocalGasStation } from "react-icons/md";
import { FaFlagCheckered } from "react-icons/fa";
import { BsCalendar3 } from "react-icons/bs";
import { BiTachometer } from "react-icons/bi";
import { RiTempColdLine } from "react-icons/ri";
import { GiGearStickPattern } from "react-icons/gi";

function Details({ product }) {
  return (
    <div>
      <Header />
      <div className="relative lg:flex m-auto max-w-7xl space-x-6 lg:mt-2 justify-center ">
        <Carousel
          className="max-w-4xl"
          /*  showStatus={false} */
          /* showThumbs={false} */
          /*  showIndicators={false} */
          /* showArrows={false} */
        >
          <div className="flex h-[560px] items-center">
            <img src={`${product.imageUrl}`} />
          </div>
          <div className="flex h-[560px] items-center">
            <img src={`${product.imageUrl2}`} />
          </div>
          <div className="flex  h-[560px] items-center">
            <img src={`${product.imageUrl3}`} />
          </div>
          <div className="flex h-[560px] items-center">
            <img src={`${product.imageUrl4}`} />
          </div>
        </Carousel>
        <div className="">
          <h1 className="text-3xl flex font-bold">
            {" "}
            {`${product.make} ${product.model}`}
          </h1>
          <h2 className="text-3xl flex font-bold">{`${product.price}€`}</h2>
          <h3 className="text-gray-400 text-sm">{`${product.timestamp}`} </h3>
          <div className="flex space-x-2 lg:flex-col lg:space-x-0 ">
            <div className="flex space-x-1 items-center ">
              <MdShareLocation className="h-5 w-5" />
              <h3 className=""> {product.location}</h3>
            </div>
            <div className="flex space-x-1 items-center ">
              <BsCalendar3 className="h-5 w-5" />
              <h3 className=""> {product.year}</h3>
            </div>
            <div className="flex space-x-1 items-center ">
              <BiTachometer className="h-5 w-5" />
              <h3 className=""> {product.kilometers}km</h3>
            </div>
            <div className="flex space-x-1 items-center ">
              <GiGearStickPattern className="h-5 w-5" />
              <h3> {product.gearbox}</h3>
            </div>
          </div>
          <div className="flex space-x-2 lg:flex-col lg:space-x-0 mb-2">
            <div className="flex space-x-1 items-center ">
              <FaFlagCheckered className="h-5 w-5" />{" "}
              <h3> {product.horsepower}hp</h3>
            </div>
            <div className="flex space-x-1 items-center ">
              <MdOutlineLocalGasStation className="h-5 w-5" />{" "}
              <h3> {product.fuel}</h3>
            </div>
            <div className="flex space-x-1 items-center ">
              <RiTempColdLine className="h-5 w-5" /> <h3> {product.cooling}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="flex max-w-7xl m-auto p-2 border mb-4 ">
        <h1 className="">{product.description}</h1>
      </div>
    </div>
  );
}

export default Details;

export async function getServerSideProps(context) {
  const data = await db.collection("moto").doc(context.params?.id).get();
  return { props: { product: data.data() } };
}
