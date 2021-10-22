import Image from "next/image";

function Post({
  username,
  make,
  model,
  price,
  imageUrl,
  imageUrl2,
  imageUrl3,
  imageUrl4,
}) {
  return (
    <div className="md:flex max-w-[100%] bg-white border border-gray-300 mb-10 shadow-md rounded-sm">
      <div className="md:w-[65%] flex p-[1px]">
        <div className="w-[76.6%] flex relative min-w-[100px] ">
          <Image src={imageUrl} layout="fill" objectFit="cover" />
        </div>
        <div className="flex flex-col w-[25.6%] m-auto ">
          <Image
            className="w-full object-contain "
            src={imageUrl2}
            width={890}
            height={500}
            objectFit="cover"
          />
          <Image
            className="w-full object-contain"
            src={imageUrl3}
            width={890}
            height={500}
            objectFit="cover"
          />
          <Image
            className="w-full object-contain"
            src={imageUrl4}
            width={890}
            height={500}
            objectFit="cover"
          />
        </div>
      </div>
      <div className="flex flex-col md:w-[35%] justify-between p-2  ">
        <div className="">
          <div className="text-xl font-mono font-bold">{price}€</div>
          <div className="flex space-x-1 font-mono ">
            <h3>{make}</h3>
            <h3>{model}</h3>
          </div>
        </div>
        <div className="border-t border-gray-300">
          <h3 className="">{username}</h3>
        </div>
      </div>
    </div>
  );
}

export default Post;
