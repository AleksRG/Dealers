import React from "react";

function Carousel({ product }) {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide relative max-w-7xl m-auto my-2"
      data-bs-ride="carousel"
    >
      <script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"></script>
      <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
      </div>
      <div className="carousel-inner relative w-full max-h-[700px] overflow-hidden ">
        <div className="carousel-item active float-left w-full">
          <img
            src={`${product.imageUrl}`}
            className="block w-full"
            alt={`${product.make} ${product.model}`}
          />
        </div>
        <div className="carousel-item float-left w-full">
          <img
            src={`${product.imageUrl2}`}
            className="block w-full"
            alt={`${product.make} ${product.model}`}
          />
        </div>
        <div className="carousel-item float-left w-full">
          <img
            src={`${product.imageUrl3}`}
            className="block w-full"
            alt={`${product.make} ${product.model}`}
          />
        </div>
        <div className="carousel-item float-left w-full">
          <img
            src={`${product.imageUrl4}`}
            className="block w-full"
            alt={`${product.make} ${product.model}`}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
