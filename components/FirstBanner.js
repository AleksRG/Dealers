function FirstBanner() {
  return (
    <div className="overflow-hidden ">
      <h1 className="font-satisfy p-4 font-bold mt-4 text-5xl m-auto text-center sm:mt-10">
        Bikes Cars Vans Trucks Farm Boats Caravans
      </h1>

      <div className="mt-6 m-auto grid grid-flow-col grid-rows-2 grid-cols-3 gap-2 max-w-2xl ">
        <div className="transform scale-110 -rotate-6 w-60">
          <img
            className="rounded-xl"
            src="https://firebasestorage.googleapis.com/v0/b/my-project-5c404.appspot.com/o/images%2Fss.jpg?alt=media&token=94338bbf-5abb-4e70-bfec-cd4c51731414"
            alt=""
            loading="lazy"
          />
        </div>
        <div className="col-start-3 transform scale-110 w-60 rotate-6 translate-x-2 translate-y-15 relative">
          <img
            className="rounded-xl"
            src="https://firebasestorage.googleapis.com/v0/b/my-project-5c404.appspot.com/o/images%2Fssssss.jpg?alt=media&token=b246da58-4117-48d5-85ca-0b451c053820"
            alt=""
            loading="lazy"
          />
        </div>
        <div className="transform scale-150 translate-y-11">
          <img
            className="rounded-xl"
            src="https://firebasestorage.googleapis.com/v0/b/my-project-5c404.appspot.com/o/images%2Fsssss.jpg?alt=media&token=f1feb87b-af9b-4006-9f45-98611cf5fe91"
            alt=""
            loading="lazy"
          />
        </div>
        <div className="transform translate-y-24 ">
          <img
            className="rounded-xl"
            src="https://firebasestorage.googleapis.com/v0/b/my-project-5c404.appspot.com/o/images%2Fssss.jpg?alt=media&token=940e3776-933b-48ba-85bb-809d0e12a087"
            alt=""
            loading="lazy"
          />
        </div>
        <div className="row-start-1 col-start-2 col-span-2 transform translate-x-20 translate-y-4 scale-75">
          <img
            className="rounded-xl"
            src="https://firebasestorage.googleapis.com/v0/b/my-project-5c404.appspot.com/o/images%2Fsss.jpg?alt=media&token=d0b75dd1-5f8d-45a3-93a8-99da8bdd53a9"
            alt=""
            loading="lazy"
          />
        </div>
      </div>
      <h2 className="font-satisfy font-bold text-5xl m-auto text-center mt-4 p-4">
        Online marketplace for vehicle buyers and sellers
      </h2>
    </div>
  );
}

export default FirstBanner;
