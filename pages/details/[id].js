import { db } from "../firebase";
import Header from "../components/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { MdShareLocation } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";

function Details({ product }) {
  return (
    <div>
      <Header />
      <div className="relative lg:flex m-auto max-w-7xl space-x-6 lg:mt-2 justify-center">
        <Carousel className="max-w-4xl">
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
          <h1 className="text-3xl flex  font-mono font-bold">
            {" "}
            {`${product.make} ${product.model}`}
          </h1>
          <h2 className="text-3xl flex  font-mono font-bold">{`${product.price}€`}</h2>
          <p className="text-md text-gray-400">{`${product.timestamp}`} </p>
          <div>
            <p className="flex space-x-1 items-center font-mono">
              <MdShareLocation className="h-6 w-6" />{" "}
              <p className="text-xl"> {product.location}</p>
            </p>
            <p className="flex space-x-1 items-center font-mono">
              <BsCalendar3 className="h-6 w-6" />{" "}
              <p className="text-xl"> {product.year}</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;

export async function getServerSideProps(context) {
  const data = await db.collection("moto").doc(context.params?.id).get();
  return { props: { product: data.data() } };
}
