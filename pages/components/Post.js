import Image from "next/image";
import { useRouter } from "next/router";

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
  horsepower,
  year,
  kilometers,
  id,
}) {
  const router = useRouter();
  const seeMore = (id, e) => {
    router.push(`/todos/${id}`);
  };
  return (
    <div className="md:flex bg-[#ffffff] mb-10 mx-4 border rounded-sm max-w-4xl cursor-pointer hover:scale-105 transform transition duration-300 ease-out">
      <div className="md:w-[65%] flex p-[1px] ">
        <div className="flex w-[76.6%] relative min-w-[100px]">
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
      <div className="flex flex-col bg-white md:w-[35%] justify-between p-2 ">
        <div className="flex justify-between relative">
          <div className="font-mono font-bold ">{price}€</div>
          <div className="space-x-1 font-mono font-bold relative text-right">
            <h3>
              {make} {model}
            </h3>
          </div>
        </div>{" "}
        <div className="flex space-x-2 font-mono relative border-b">
          <p>
            {horsepower}Hp {year}year {kilometers}km{" "}
          </p>
        </div>
        <text className="h-12 leading-4 md:h-24 lg:h-32 overflow-hidden ">
          RESERVE NOW ONLINE! APPLY ONLINE NOW, as getting onboard your next
          motorbike has never been so easy and affordable. We offer motorbike
          specific PCP, HP and Loans from all the leading lenders, simply visit
          our website now to get a quote. Get this motorbike delivered or
          arrange to collect it from either our Donington Park or Cheshire
          Showrooms, or from our London collection location. Considering Part
          Exchanging your existing motorbike? Just visit our website, enter the
          details of your current motorbike and we'll provide you with a price
          to change. With over 2,000
        </text>
        <div className="border-t flex justify-between text-center text-xs text-gray-400">
          {/* <h3 className="">{username}</h3> */}
          <p>{new Date(timestamp?.toDate()).toLocaleString("bg-BG")}</p>{" "}
          <button onClick={(e) => seeMore(id, e)}>see</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
