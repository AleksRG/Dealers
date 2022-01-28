import Image from "next/image";
import { useRouter } from "next/router";

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
}) {
  const router = useRouter();
  const seeMore = (reference) => {
    /* router.push(`/details/${reference}`); */
    window.open(`/details/${reference}`);
  };

  return (
    <div
      className="md:flex bg-[#ffffff] mb-8 mx-0.5 border rounded-sm max-w-4xl cursor-pointer lg:hover:scale-105 transform transition duration-300 ease-out"
      onClick={(e) => seeMore(reference, e)}
    >
      <div className="md:w-[65%] flex">
        <div className="flex w-[76.6%] relative min-w-[100px]">
          <Image src={imageUrl} width={890} height={500} objectFit="cover" />
        </div>
        <div className="flex flex-col w-[25.6%] m-auto">
          <Image
            className="w-full"
            src={imageUrl2}
            width={890}
            height={500}
            objectFit="cover"
          />
          <Image
            className="w-full"
            src={imageUrl3}
            width={890}
            height={500}
            objectFit="cover"
          />
          <Image
            className="w-full"
            src={imageUrl4}
            width={890}
            height={500}
            objectFit="cover"
          />
        </div>
      </div>
      <div className="flex font-mono flex-col bg-white md:w-[35%] justify-between px-1.5">
        <div className="flex justify-between relative">
          <div className="font-mono font-bold">{price}€</div>
          <div className="space-x-1 font-mono font-bold relative text-right">
            <h3>
              {make} {model}
            </h3>
          </div>
        </div>{" "}
        <div className="flex space-x-2 font-mono relative border-b">
          <p>
            {horsepower}hp {year}year {kilometers}km{" "}
          </p>
        </div>
        <div className="h-16 leading-4 md:h-24 lg:h-36 overflow-hidden my-1">
          {description}
        </div>
        <div className="border-t flex justify-between text-center text-xs text-gray-400 ">
          <p className="">{username}</p>
          <p>{timestamp}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
