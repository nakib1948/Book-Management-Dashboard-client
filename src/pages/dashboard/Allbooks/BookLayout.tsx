import { Link, Outlet } from "react-router-dom";
import {
  Card,
  Typography,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";

import { useState } from "react";
import Allbooks from "./Allbooks";

const BookLayout = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div className="p-2">
      <nav
      className=" block w-full max-w-full px-4 py-2 text-white bg-white border rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <a href="#"
          className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
          Material Tailwind
        </a>
        <a href="#"
          className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
          Material Tailwind
        </a>
      
      </div>
    </nav>
      <div className="grid grid-cols-6 gap-0 md:gap-2 lg:gap-2 p-2">
        <div className="md:col-span-1 lg:col-span-1 col-span-1 bg-black  shadow-md rounded-md p-2 ">
          <div className="drawer lg:drawer-open z-10">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
              >
                Open drawer
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <Card className="p-1 mr-3 h-screen w-[200px] shadow-xl shadow-blue-gray-900/5">
                <div className="mb-2">
                  <Typography
                    className="text-center"
                    variant="h5"
                    color="blue-gray"
                  >
                    Filter
                  </Typography>
                </div>
                <div className="mb-3">
                  <Select variant="standard" label="Filter by language">
                    <Option>English</Option>
                    <Option>Bangla</Option>
                    <Option>Hindi</Option>
                    <Option>Arabic</Option>
                    <Option>Chinese</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <Select variant="standard" label="Filter by genre">
                    <Option>Adventure</Option>
                    <Option>FICTION</Option>
                    <Option>FANTACY</Option>
                    <Option>THRILLER</Option>
                    <Option>ROMANCE</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <Select variant="standard" label="Filter by series">
                    <Option>Harry Potter</Option>
                    <Option>The Lord of the Rings</Option>
                    <Option>Game of Thrones</Option>
                    <Option>The Hunger Games </Option>
                    <Option>Percy Jackson & the Olympians </Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <Select variant="standard" label="Filter by format">
                    <Option>hardcover</Option>
                    <Option>paperback</Option>
                    <Option>e-book</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <Input
                    type="date"
                    variant="standard"
                    label="Filter by date"
                    placeholder="Standard"
                  />
                </div>
                <div className="mb-3">
                  <Input
                    variant="standard"
                    label="Filter by author"
                    placeholder="Standard"
                  />
                </div>
                <div className="mb-3">
                  <Input
                    variant="standard"
                    label="Filter by publisher"
                    placeholder="Standard"
                  />
                </div>
                <div className="mb-3">
                  <Input
                    variant="standard"
                    label="Filter by ISBN"
                    placeholder="Standard"
                  />
                </div>
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
                  type="button"
                >
                  Filter
                </button>
              </Card>
            </div>
          </div>
        </div>
        <div
          id="noscrollbar"
          className="md:col-span-5 h-screen lg:col-span-5 col-span-6 bg-white m-0 md:m-3 lg:m-3 shadow-md rounded-md p-2 overflow-y-scroll "
        >
          <Allbooks />
        </div>
      </div>
    </div>
  );
};

export default BookLayout;
