import { db } from "../firebase";
import Header from "../components/Header";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Details({ product }) {
  return (
    <div>
      <Header />
      <div className="relative flex flex-col m-auto max-w-4xl">
        <Carousel>
          <div className="flex h-[560px] items-center">
            <img src={`${product.imageUrl}`} />
          </div>
          <div className="flex h-[560px] items-center">
            <img src={`${product.imageUrl2}`} />
          </div>
          <div className="flex  h-[560px] items-center" objectFit="cover">
            <img src={`${product.imageUrl3}`} />
          </div>
          <div className="flex h-[560px] items-center">
            <img src={`${product.imageUrl4}`} />
          </div>
        </Carousel>
        <h1>
          {`${product.make} ${product.model} ${product.year} - ${product.price}€ - ${product.username} ${product.timestamp}`}{" "}
        </h1>
      </div>
    </div>
  );
}

export default Details;

export async function getServerSideProps(context) {
  const data = await db.collection("moto").doc(context.params?.id).get();
  return { props: { product: data.data() } };
}
