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
  timestamp,
}) {
  return (
    <div className="md:flex bg-[#FFFFFF] border border-gray-300 mb-10 shadow-md rounded-sm max-w-5xl">
      <div className="md:w-[65%] flex p-[1px]">
        <div className="flex w-[76.6%] relative min-w-[100px] ">
          <Image src={imageUrl} layout="fill" objectFit="cover" />
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
      <div className="flex flex-col bg-white md:w-[35%] justify-between p-2  ">
        <div className="">
          <div className="text-xl font-mono font-bold">{price}€</div>
          <div className="flex space-x-1 font-mono ">
            <h3>{make}</h3>
            <h3>{model}</h3>
          </div>
        </div>
        <div className="border-t border-gray-300">
          <h3 className="">{username}</h3>
          <p className="text-xs text-gray-400">
            {new Date(timestamp?.toDate()).toLocaleString("bg-BG")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Post;
