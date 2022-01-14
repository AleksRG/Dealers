import { db } from "../firebase";
import Image from "next/image";

function Details({ product }) {
  return (
    <div className="p-10">
      <h1>{`${product.make} ${product.model} -> ${product.price} €`} </h1>
      <Image
        className="w-full"
        src={`${product.imageUrl}`}
        width={400}
        height={200}
        objectFit="cover"
      />
      <Image
        className="w-full"
        src={`${product.imageUrl2}`}
        width={400}
        height={200}
        objectFit="cover"
      />
      <Image
        className="w-full"
        src={`${product.imageUrl3}`}
        width={400}
        height={200}
        objectFit="cover"
      />
      <Image
        className="w-full"
        src={`${product.imageUrl4}`}
        width={400}
        height={200}
        objectFit="cover"
      />
    </div>
  );
}

export default Details;

export async function getServerSideProps(context) {
  const data = await db.collection("moto").doc(context.params?.id).get();
  return { props: { product: data.data() } };
}
