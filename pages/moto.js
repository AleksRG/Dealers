import { useState, Fragment } from "react";
import Header from "../components/Header";
import { db } from "/firebase";
import dataMoto from "./dataMoto.json";
import { useSession } from "next-auth/client";
import PostN from "../components/PostN";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";

function Moto({ items }) {
  const [make, setMake] = useState("All");
  const [model, setModel] = useState("All");
  const [modelList, setModelList] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [session] = useSession();

  function makeFilter(value) {
    setMake(value);
    setModelList(dataMoto.find((x) => x.name === value).model) || "";
    setModel("All");
    setMinPrice("");
    setMaxPrice("");
  }

  function modelFilter(value) {
    setModel(value);
    setMinPrice("");
    setMaxPrice("");
  }

  function minPriceFilter(value) {
    setMinPrice(value);
    setMaxPrice("");
  }

  function maxPriceFilter(value) {
    setMaxPrice(value);
  }

  const prices = [
    500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500,
    7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000,
    12500, 13000, 13500, 14000, 14500, 15000, 15500, 16000, 16500, 17000, 17500,
    18000, 18500, 19000, 19500, 20000, 20500, 21000, 21500, 22000, 22500, 23000,
    23500, 24000, 24500, 25000, 25500, 26000, 26500, 27000, 27500, 28000, 28500,
    29000, 29500, 30000, 30500, 31000, 31500, 32000, 32500, 33000, 33500, 34000,
    34500, 35000, 35500, 36000, 36500, 37000, 37500, 38000, 38500, 39000, 39500,
    40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000,
    95000, 100000,
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-[1800px] m-auto">
        <div className="w-44 fixed top-16 ml-2 space-y-2">
          <Listbox value={make} onChange={makeFilter}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-white text-sm ">
                <span className="block truncate">{make}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto  bg-white rounded-lg shadow-lg max-h-60 ring-opacity-5 focus:outline-none text-sm">
                  {dataMoto.map((person, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `${
                          active ? "text-blue-900 bg-blue-100" : "text-gray-900"
                        }
                          cursor-default select-none relative pl-10 pr-4`
                      }
                      value={`${person.name}`}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? "font-medium" : "font-normal"
                            } block truncate`}
                          >
                            {`${person.name}`}
                          </span>
                          {selected ? (
                            <span
                              className={`${
                                active ? "text-blue-600" : "text-blue-600"
                              }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>

          <Listbox value={model} onChange={modelFilter}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-white text-sm">
                <span className="block truncate">{model}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto  bg-white rounded-lg  shadow-lg max-h-60 ring-opacity-5 focus:outline-none text-sm">
                  {modelList.map((person, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `${
                          active ? "text-blue-900 bg-blue-100" : "text-gray-900"
                        }
                          cursor-default select-none relative pl-10 pr-4`
                      }
                      value={`${person.name}`}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? "font-medium" : "font-normal"
                            } block truncate`}
                          >
                            {`${person.name}`}
                          </span>
                          {selected ? (
                            <span
                              className={`${
                                active ? "text-blue-600" : "text-blue-600"
                              }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>

          <Listbox value={minPrice} onChange={minPriceFilter}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-white text-sm">
                <span className="block truncate">
                  {minPrice || "Min price"}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg  shadow-lg max-h-60 ring-opacity-5 focus:outline-none text-sm">
                  {prices.map((price, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `${
                          active ? "text-blue-900 bg-blue-100" : "text-gray-900"
                        }
                          cursor-default select-none relative pl-10 pr-4`
                      }
                      value={price}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? "font-medium" : "font-normal"
                            } block truncate`}
                          >
                            {price}
                          </span>
                          {selected ? (
                            <span
                              className={`${
                                active ? "text-blue-600" : "text-blue-600"
                              }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>

          <Listbox value={maxPrice} onChange={maxPriceFilter}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-white text-sm">
                <span className="block truncate">
                  {maxPrice || "Max price"}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg  shadow-lg max-h-60 ring-opacity-5 focus:outline-none text-sm">
                  {prices
                    .filter((price) => price > minPrice)
                    .map((price, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `${
                            active
                              ? "text-blue-900 bg-blue-100"
                              : "text-gray-900"
                          }
                          cursor-default select-none relative pl-10 pr-4`
                        }
                        value={price}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`${
                                selected ? "font-medium" : "font-normal"
                              } block truncate`}
                            >
                              {price}
                            </span>
                            {selected ? (
                              <span
                                className={`${
                                  active ? "text-blue-600" : "text-blue-600"
                                }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                              >
                                <CheckIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div>
          {make == "All"
            ? !minPrice
              ? items
                  .filter(
                    maxPrice
                      ? (x) => x.post.price <= maxPrice
                      : (x) => x.post.price <= Number.MAX_VALUE
                  )
                  .map(({ id, post }) => (
                    <PostN
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
                  ))
              : items
                  .filter(
                    !maxPrice
                      ? (x) => x.post.price >= minPrice
                      : (x) =>
                          x.post.price >= minPrice && x.post.price <= maxPrice
                  )
                  .map(({ id, post }) => (
                    <PostN
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
                  ))
            : items
                .filter(
                  model === "All"
                    ? (x) => x.post.make == make
                    : (x) => x.post.make == make && x.post.model == model
                )
                .filter(
                  !maxPrice
                    ? (x) => x.post.price >= minPrice
                    : (x) =>
                        x.post.price >= minPrice && x.post.price <= maxPrice
                )
                .map(({ id, post }) => (
                  <PostN
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
export default Moto;

export async function getServerSideProps() {
  const data = await db.collection("moto").get();
  return {
    props: {
      items: data.docs.map((doc) => ({
        id: doc.id,
        post: doc.data(),
      })),
    },
  };
}
