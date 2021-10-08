import Image from "next/image";

function Post({
  user,
  username,
  caption,
  imageUrl,
  imageUrl2,
  imageUrl3,
  imageUrl4,
}) {
  return (
    <div className="lg:flex max-w-[80%] bg-white border border-gray-300 mb-10">
      <div className="lg:w-[65%] flex">
        <div className="w-[76.6%] flex ">
          <Image
            className="w-full object-contain"
            src={imageUrl}
            width={890}
            height={500}
          />
        </div>
        <div className="flex flex-col w-[25.6%] m-auto ">
          <Image
            className="w-full object-contain"
            src={imageUrl2}
            width={890}
            height={500}
          />
          <Image
            className="w-full object-contain"
            src={imageUrl3}
            width={890}
            height={500}
          />
          <Image
            className="w-full object-contain"
            src={imageUrl4}
            width={890}
            height={500}
          />
        </div>
      </div>
      <div className="flex flex-col w-[35%] items-center space-x-2 ">
        {
          /* <Image
          className="rounded-full mx-auto border-t border-b border-gray-300"
          src={user}
          alt="Username"
          width="32"
          height="32"
          loading="lazy"
        />*/
          <h3>{username}</h3>
        }
        <h4 className="p-2">
          <strong>{username} </strong>
          {caption}
        </h4>
      </div>
    </div>
  );
}

export default Post;
