import { db } from "/firebase";
import Header from "/components/Header";
import Carousel from "../../components/Carousel";

function Details({ product }) {
  return (
    <div>
      <Header />
      <Carousel product={product} />
      <div className="flex max-w-7xl m-auto p-2 border mb-4 ">
        <h1 className="">{product.description}</h1>
      </div>
    </div>
  );
}

export default Details;

export async function getServerSideProps(context) {
  const data = await db.collection("trucks").doc(context.params?.id).get();
  return { props: { product: data.data() } };
}
