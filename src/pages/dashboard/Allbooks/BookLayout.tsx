import { Link, Outlet } from "react-router-dom";
import { Card, Button, Select, Option, Input } from "@material-tailwind/react";

import { useState } from "react";
import Allbooks from "./Allbooks";

const BookLayout = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div className="p-2">
      <div className="flex mt-5 justify-around flex-wrap ">
        <div className="w-44 mx-10">
          <Select variant="standard" label="Filter by language">
            <Option>English</Option>
            <Option>Bangla</Option>
            <Option>Hindi</Option>
            <Option>Arabic</Option>
            <Option>Chinese</Option>
          </Select>
        </div>

        <div className="w-44 mx-10">
          <Select variant="standard" label="Filter by genre">
            <Option>Adventure</Option>
            <Option>FICTION</Option>
            <Option>FANTACY</Option>
            <Option>THRILLER</Option>
            <Option>ROMANCE</Option>
          </Select>
        </div>
        <div className="w-44 mx-10">
          <Select variant="standard" label="Filter by series">
            <Option>Harry Potter</Option>
            <Option>The Lord of the Rings</Option>
            <Option>Game of Thrones</Option>
            <Option>The Hunger Games </Option>
            <Option>Percy Jackson & the Olympians </Option>
          </Select>
        </div>
        <div className="w-44 mx-10">
          <Select variant="standard" label="Filter by format">
            <Option>hardcover</Option>
            <Option>paperback</Option>
            <Option>e-book</Option>
          </Select>
        </div>
        <div className="w-44 mx-10">
          <Input
            type="date"
            variant="standard"
            label="Filter by date"
            placeholder="Standard"
          />
        </div>
        <div className="w-44">
          <Input
            variant="standard"
            label="Filter by author"
            placeholder="Standard"
          />
        </div>
        <div className="w-44">
          <Input
            variant="standard"
            label="Filter by publisher"
            placeholder="Standard"
          />
        </div>
        <div className="w-44">
          <Input
            variant="standard"
            label="Filter by ISBN"
            placeholder="Standard"
          />
        </div>
        <div className="w-44">
          <Input
            type="number"
            variant="standard"
            label="Filter by min price"
            placeholder="Standard"
          />
        </div>
        <div className="w-44">
          <Input
            type="number"
            variant="standard"
            label="Filter by max price"
            placeholder="Standard"
          />
        </div>
      </div>
      <Button className="my-5" fullWidth>
        Filter
      </Button>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="search book or author"
          className="input input-bordered input-primary w-full max-w-xs"
        />

        <button className="text-white border-0 py-2 ml-2 px-8 focus:outline-none bg-indigo-600 rounded text-lg">
          search
        </button>
      </div>
      <Allbooks />
    </div>
  );
};

export default BookLayout;
