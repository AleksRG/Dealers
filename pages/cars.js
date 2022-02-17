import { useState, Fragment } from "react";
import Header from "../components/Header";
import { db } from "/firebase";
import dataMoto from "./dataCar.json";
import prices from "./dataPrices.json";
import years from "./dataMinYears.json";
import yearsMax from "./dataMaxYears.json";
import { useSession } from "next-auth/client";
import Post from "../components/PostCar";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { MdArrowBackIosNew } from "react-icons/md";

function Moto({ items }) {
  const [make, setMake] = useState("All Makes");
  const [model, setModel] = useState("All Models");
  const [modelList, setModelList] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [fuelType, setFuelType] = useState("Fuel type");
  const [minYear, setMinYear] = useState("Min year");
  const [maxYear, setMaxYear] = useState("Max year");
  const [gearbox, setGearbox] = useState("Gearbox");
  const [session] = useSession();
  const [showSidebar, setShowSidebar] = useState(false);
  const fuelTypes = ["Fuel type", "Petrol", "Diesel", "Electric", "Hybrid"];
  const gearboxType = ["Gearbox", "Manual", "Automatic"];

  function makeFilter(value) {
    setMake(value);
    setModelList(dataMoto.find((x) => x.name === value).model) || "All Models";
    setModel("All Models");
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
            <div className="w-44 fixed inset-y-1/3 ml-2 space-y-2">
              <Listbox value={make} onChange={makeFilter}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white  focus-visible:ring-offset-2 text-sm ring-1 ring-gray-100 hover:bg-gray-100">
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
                    <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-60 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
                      {dataMoto.map((data, index) => (
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
                          value={`${data.name}`}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`${
                                  selected ? "font-medium" : "font-normal"
                                } block truncate`}
                              >
                                {`${data.name}`}
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
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white  focus-visible:ring-offset-2 text-sm ring-1 ring-gray-100 hover:bg-gray-100">
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
                    <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto  bg-white rounded-lg shadow-lg max-h-60 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
                      {modelList.map((data, index) => (
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
                          value={`${data.name}`}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`${
                                  selected ? "font-medium" : "font-normal"
                                } block truncate`}
                              >
                                {`${data.name}`}
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
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white  focus-visible:ring-offset-2 text-sm ring-1 ring-gray-100 hover:bg-gray-100">
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
                    <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-40 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
                      {prices.map((price, index) => (
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

              <Listbox value={maxPrice} onChange={maxPriceFilter}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white  focus-visible:ring-offset-2 text-sm ring-1 ring-gray-100 hover:bg-gray-100">
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
                    <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-40 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
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
              <Listbox value={gearbox} onChange={gearboxFilter}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white  focus-visible:ring-offset-2 text-sm ring-1 ring-gray-100 hover:bg-gray-100">
                    <span className="block truncate">{gearbox}</span>
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
                    <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-40 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
                      {gearboxType.map((data, index) => (
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
                          value={data}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`${
                                  selected ? "font-medium" : "font-normal"
                                } block truncate`}
                              >
                                {data}
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

              <Listbox value={fuelType} onChange={fuelTypeFilter}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white  focus-visible:ring-offset-2 text-sm ring-1 ring-gray-100 hover:bg-gray-100">
                    <span className="block truncate">{fuelType}</span>
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
                    <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-40 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
                      {fuelTypes.map((data, index) => (
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
                          value={data}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`${
                                  selected ? "font-medium" : "font-normal"
                                } block truncate`}
                              >
                                {data}
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

              <Listbox value={minYear} onChange={minYearFilter}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white  focus-visible:ring-offset-2 text-sm ring-1 ring-gray-100 hover:bg-gray-100">
                    <span className="block truncate">{minYear}</span>
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
                    <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-40 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
                      {years.map((data, index) => (
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
                          value={data}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`${
                                  selected ? "font-medium" : "font-normal"
                                } block truncate`}
                              >
                                {data}
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

              <Listbox value={maxYear} onChange={maxYearFilter}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white  focus-visible:ring-offset-2 text-sm ring-1 ring-gray-100 hover:bg-gray-100">
                    <span className="block truncate">{maxYear}</span>
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
                    <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-40 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
                      {yearsMax
                        .filter(
                          minYear !== "Min year"
                            ? (x) => x >= minYear
                            : (x) => x
                        )
                        .map((data, index) => (
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
                            value={data}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`${
                                    selected ? "font-medium" : "font-normal"
                                  } block truncate`}
                                >
                                  {data}
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
          </div>
        </div>
        <div className="w-44 fixed top-16 ml-2 2xl:ml-24 space-y-2 hidden lg:block">
          <Listbox value={make} onChange={makeFilter}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white  focus-visible:ring-offset-2 text-sm ring-1 ring-gray-100 hover:bg-gray-100">
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
                <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-60 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
                  {dataMoto.map((data, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `${
                          active ? "text-blue-900 bg-blue-100" : "text-gray-900"
                        }
                          cursor-default select-none relative pl-10 pr-4`
                      }
                      value={`${data.name}`}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? "font-medium" : "font-normal"
                            } block truncate`}
                          >
                            {`${data.name}`}
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
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white  focus-visible:ring-offset-2 text-sm ring-1 ring-gray-100 hover:bg-gray-100">
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
                <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto  bg-white rounded-lg shadow-lg max-h-60 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
                  {modelList.map((data, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `${
                          active ? "text-blue-900 bg-blue-100" : "text-gray-900"
                        }
                          cursor-default select-none relative pl-10 pr-4`
                      }
                      value={`${data.name}`}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? "font-medium" : "font-normal"
                            } block truncate`}
                          >
                            {`${data.name}`}
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
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white  focus-visible:ring-offset-2 text-sm ring-1 ring-gray-100 hover:bg-gray-100">
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
                <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-40 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
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
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white  focus-visible:ring-offset-2 text-sm ring-1 ring-gray-100 hover:bg-gray-100">
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
                <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-40 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
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
          <Listbox value={gearbox} onChange={gearboxFilter}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white  focus-visible:ring-offset-2 text-sm ring-1 ring-gray-100 hover:bg-gray-100">
                <span className="block truncate">{gearbox}</span>
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
                <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-40 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
                  {gearboxType.map((data, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `${
                          active ? "text-blue-900 bg-blue-100" : "text-gray-900"
                        }
                          cursor-default select-none relative pl-10 pr-4`
                      }
                      value={data}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? "font-medium" : "font-normal"
                            } block truncate`}
                          >
                            {data}
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

          <Listbox value={fuelType} onChange={fuelTypeFilter}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white  focus-visible:ring-offset-2 text-sm ring-1 ring-gray-100 hover:bg-gray-100">
                <span className="block truncate">{fuelType}</span>
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
                <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-40 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
                  {fuelTypes.map((data, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `${
                          active ? "text-blue-900 bg-blue-100" : "text-gray-900"
                        }
                          cursor-default select-none relative pl-10 pr-4`
                      }
                      value={data}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? "font-medium" : "font-normal"
                            } block truncate`}
                          >
                            {data}
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

          <Listbox value={minYear} onChange={minYearFilter}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white  focus-visible:ring-offset-2 text-sm ring-1 ring-gray-100 hover:bg-gray-100">
                <span className="block truncate">{minYear}</span>
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
                <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-40 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
                  {years.map((data, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `${
                          active ? "text-blue-900 bg-blue-100" : "text-gray-900"
                        }
                          cursor-default select-none relative pl-10 pr-4`
                      }
                      value={data}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? "font-medium" : "font-normal"
                            } block truncate`}
                          >
                            {data}
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

          <Listbox value={maxYear} onChange={maxYearFilter}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white  focus-visible:ring-offset-2 text-sm ring-1 ring-gray-100 hover:bg-gray-100">
                <span className="block truncate">{maxYear}</span>
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
                <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-40 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
                  {yearsMax
                    .filter(
                      minYear !== "Min year" ? (x) => x >= minYear : (x) => x
                    )
                    .map((data, index) => (
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
                        value={data}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`${
                                selected ? "font-medium" : "font-normal"
                              } block truncate`}
                            >
                              {data}
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

        <div className="lg:ml-48">
          {make === "All Makes"
            ? !minPrice
              ? items
                  .filter(
                    maxPrice
                      ? (x) => x.post.price <= maxPrice
                      : (x) => x.post.price <= Number.MAX_VALUE
                  )
                  .filter(
                    fuelType !== "Fuel type"
                      ? (x) => x.post.fuel === fuelType
                      : (x) => x.post.fuel
                  )
                  .filter(
                    gearbox !== "Gearbox"
                      ? (x) => x.post.gearbox === gearbox
                      : (x) => x.post.gearbox
                  )
                  .filter(
                    minYear !== "Min year"
                      ? (x) => x.post.year >= minYear
                      : (x) => x.post.year
                  )
                  .filter(
                    maxYear !== "Max year"
                      ? (x) => x.post.year <= maxYear
                      : (x) => x.post.year
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
                  ))
              : items
                  .filter(
                    !maxPrice
                      ? (x) => x.post.price >= minPrice
                      : (x) =>
                          x.post.price >= minPrice && x.post.price <= maxPrice
                  )
                  .filter(
                    fuelType !== "Fuel type"
                      ? (x) => x.post.fuel === fuelType
                      : (x) => x.post.fuel
                  )
                  .filter(
                    gearbox !== "Gearbox"
                      ? (x) => x.post.gearbox === gearbox
                      : (x) => x.post.gearbox
                  )
                  .filter(
                    minYear !== "Min year"
                      ? (x) => x.post.year >= minYear
                      : (x) => x.post.year
                  )
                  .filter(
                    maxYear !== "Max year"
                      ? (x) => x.post.year <= maxYear
                      : (x) => x.post.year
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
                  ))
            : items
                .filter(
                  model === "All Models"
                    ? (x) => x.post.make == make
                    : (x) => x.post.make == make && x.post.model == model
                )
                .filter(
                  !maxPrice
                    ? (x) => x.post.price >= minPrice
                    : (x) =>
                        x.post.price >= minPrice && x.post.price <= maxPrice
                )
                .filter(
                  fuelType !== "Fuel type"
                    ? (x) => x.post.fuel === fuelType
                    : (x) => x.post.fuel
                )
                .filter(
                  gearbox !== "Gearbox"
                    ? (x) => x.post.gearbox === gearbox
                    : (x) => x.post.gearbox
                )
                .filter(
                  minYear !== "Min year"
                    ? (x) => x.post.year >= minYear
                    : (x) => x.post.year
                )
                .filter(
                  maxYear !== "Max year"
                    ? (x) => x.post.year <= maxYear
                    : (x) => x.post.year
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
export default Moto;

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
