import { useState } from "react";
import Header from "../components/Header";
import { db } from "/firebase";
import dataMoto from "./dataCar.json";
import prices from "./dataPrices.json";
import years from "./dataMinYears.json";
import yearsMax from "./dataMaxYears.json";
import Post from "../components/PostCar";
import ListButton from "../components/ListButton";
import { MdArrowBackIosNew } from "react-icons/md";

function Car({ items }) {
  const [make, setMake] = useState("All Makes");
  const [model, setModel] = useState("All Models");
  const [modelList, setModelList] = useState([]);
  const [minPrice, setMinPrice] = useState("Min price");
  const [maxPrice, setMaxPrice] = useState("Max price");
  const [fuelType, setFuelType] = useState("Fuel type");
  const [minYear, setMinYear] = useState("Min year");
  const [maxYear, setMaxYear] = useState("Max year");
  const [gearbox, setGearbox] = useState("Gearbox");
  const [showSidebar, setShowSidebar] = useState(false);

  const fuelTypes = [
    { name: "Fuel type" },
    { name: "Petrol" },
    { name: "Diesel" },
    { name: "Electric" },
    { name: "Hybrid" },
  ];
  const gearboxType = [
    { name: "Gearbox" },
    { name: "Manual" },
    { name: "Automatic" },
  ];

  function makeFilter(value) {
    setMake(value);
    setModelList(dataMoto.find((x) => x.name === value).model) || "All Models";
    setModel("All Models");
    setMinPrice("Min price");
    setMaxPrice("Max price");
  }

  function modelFilter(value) {
    setModel(value);
    setMinPrice("Min price");
    setMaxPrice("Max price");
  }

  function minPriceFilter(value) {
    setMinPrice(value);
  }

  function maxPriceFilter(value) {
    setMaxPrice(value);
  }

  function fuelTypeFilter(value) {
    setFuelType(value);
  }

  function minYearFilter(value) {
    setMinYear(value);
  }

  function maxYearFilter(value) {
    setMaxYear(value);
  }

  function gearboxFilter(value) {
    setGearbox(value);
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-[1800px]">
        <div className="lg:hidden">
          {showSidebar ? (
            <MdArrowBackIosNew
              className="h-8 w-8 ml-52 items-center cursor-pointer text-sky-500 fixed inset-y-1/2 z-50 "
              onClick={() => setShowSidebar(!showSidebar)}
            />
          ) : (
            <MdArrowBackIosNew
              onClick={() => setShowSidebar(!showSidebar)}
              className="fixed items-center cursor-pointer text-sky-500 inset-y-1/2 h-12 w-12 pr-4 rotate-180 rounded-md -left-5 bg-white/75 shadow-md z-50"
            />
          )}

          <div
            className={`top-0 left-0 w-60 h-full bg-white/75 p-4 fixed ease-in-out duration-500 shadow-md ${
              showSidebar ? "" : "-translate-x-full"
            }`}
          >
            {" "}
            <div className="w-44 fixed inset-y-1/3 ml-2 space-y-2">
              <ListButton type={make} func={makeFilter} data={dataMoto} />
              <ListButton type={model} func={modelFilter} data={modelList} />
              <ListButton
                type={minPrice}
                func={minPriceFilter}
                data={
                  maxPrice === "Max price"
                    ? prices
                    : prices.filter((price) => price.name < maxPrice)
                }
              />
              <ListButton
                type={maxPrice}
                func={maxPriceFilter}
                data={
                  minPrice === "Min price"
                    ? prices
                    : prices.filter((price) => price.name > minPrice)
                }
              />
              <ListButton
                type={gearbox}
                func={gearboxFilter}
                data={gearboxType}
              />
              <ListButton
                type={fuelType}
                func={fuelTypeFilter}
                data={fuelTypes}
              />
              <ListButton
                type={minYear}
                func={minYearFilter}
                data={
                  maxYear === "Max year"
                    ? years
                    : years.filter((year) => year.name < maxYear)
                }
              />
              <ListButton
                type={maxYear}
                func={maxYearFilter}
                data={
                  minYear === "Min year"
                    ? yearsMax
                    : yearsMax.filter((year) => year.name > minYear)
                }
              />
            </div>
          </div>
        </div>
        <div className="w-44 fixed top-16 ml-2 2xl:ml-24 space-y-2 hidden lg:block">
          <ListButton type={make} func={makeFilter} data={dataMoto} />
          <ListButton type={model} func={modelFilter} data={modelList} />
          <ListButton
            type={minPrice}
            func={minPriceFilter}
            data={
              maxPrice === "Max price"
                ? prices
                : prices.filter((price) => price.name < maxPrice)
            }
          />
          <ListButton
            type={maxPrice}
            func={maxPriceFilter}
            data={
              minPrice === "Min price"
                ? prices
                : prices.filter((price) => price.name > minPrice)
            }
          />
          <ListButton type={gearbox} func={gearboxFilter} data={gearboxType} />
          <ListButton type={fuelType} func={fuelTypeFilter} data={fuelTypes} />
          <ListButton
            type={minYear}
            func={minYearFilter}
            data={
              maxYear === "Max year"
                ? years
                : years.filter((year) => year.name < maxYear)
            }
          />
          <ListButton
            type={maxYear}
            func={maxYearFilter}
            data={
              minYear === "Min year"
                ? yearsMax
                : yearsMax.filter((year) => year.name > minYear)
            }
          />
        </div>

        <div className="lg:ml-48">
          {items
            .filter(
              make === "All Makes"
                ? (x) => x.post.make
                : (x) => x.post.make == make
            )
            .filter(
              model === "All Models"
                ? (x) => x.post.make
                : (x) => x.post.make == make && x.post.model == model
            )
            .filter(
              minPrice === "Min price"
                ? (x) => x.post.price
                : (x) => x.post.price >= minPrice
            )
            .filter(
              maxPrice === "Max price"
                ? (x) => x.post.price
                : (x) => x.post.price <= maxPrice
            )
            .filter(
              fuelType === "Fuel type"
                ? (x) => x.post.fuel
                : (x) => x.post.fuel === fuelType
            )
            .filter(
              gearbox === "Gearbox"
                ? (x) => x.post.gearbox
                : (x) => x.post.gearbox === gearbox
            )
            .filter(
              minYear === "Min year"
                ? (x) => x.post.year
                : (x) => x.post.year >= minYear
            )
            .filter(
              maxYear === "Max year"
                ? (x) => x.post.year
                : (x) => x.post.year <= maxYear
            )
            .map(({ id, post }) => (
              <Post
                reference={id}
                key={id.toString()}
                username={post.username}
                make={post.make}
                model={post.model}
                price={post.price}
                imageUrl={post.imageUrl}
                imageUrl2={post.imageUrl2}
                imageUrl3={post.imageUrl3}
                imageUrl4={post.imageUrl4}
                timestamp={post.timestamp}
                horsepower={post.horsepower}
                year={post.year}
                kilometers={post.kilometers}
                description={post.description}
                gearbox={post.gearbox}
                kilometers={post.kilometers}
                fuel={post.fuel}
                location={post.location}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
export default Car;

export async function getServerSideProps() {
  const data = await db.collection("posts").get();
  return {
    props: {
      items: data.docs.map((doc) => ({
        id: doc.id,
        post: doc.data(),
      })),
    },
  };
}
