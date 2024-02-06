import { Card, Button, Select, Option, Input } from "@material-tailwind/react";

import { useState } from "react";
import Allbooks from "./Allbooks";
import { useForm } from "react-hook-form";

const BookLayout = () => {
  const [open, setOpen] = useState(0);
  const { register, handleSubmit, reset } = useForm();
  const [queryparam, setQueryParam] = useState("");
  const [searchOption, setsearchOption] = useState("");
  const [searchQueryParam, setsearchQueryParam] = useState("searchTerm=");

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const onSubmit = async (data) => {
    await setQueryParam("");
    let queryParam = "";
    if (data.author) {
      queryParam += `${queryParam ? "&" : ""}author=${data.author}`;
    }
    if (data.genre) {
      if (data.genre != "Filter by genre")
        queryParam += `${queryParam ? "&" : ""}genre=${data.genre}`;
    }
    if (data.language) {
      if (data.language != "Filter by language")
        queryParam += `${queryParam ? "&" : ""}language=${data.language}`;
    }
    if (data.format) {
      if (data.format != "Filter by format")
        queryParam += `${queryParam ? "&" : ""}format=${data.format}`;
    }
    if (data.isbn) {
      queryParam += `${queryParam ? "&" : ""}isbn=${data.isbn}`;
    }
    if (data.minPrice) {
      queryParam += `${queryParam ? "&" : ""}minPrice=${data.minPrice}`;
    }
    if (data.maxPrice) {
      queryParam += `${queryParam ? "&" : ""}maxPrice=${data.maxPrice}`;
    }
    if (data.publisher) {
      queryParam += `${queryParam ? "&" : ""}publisher=${data.publisher}`;
    }
    if (data.releaseDate) {
      queryParam += `${queryParam ? "&" : ""}releaseDate=${data.releaseDate}`;
    }
    if (data.series) {
      if (data.series != "Filter by series")
        queryParam += `${queryParam ? "&" : ""}series=${data.series}`;
    }
    reset();
    setQueryParam(queryParam);
  };

  const searchParam = async () => {
    setsearchQueryParam(`searchTerm=${searchOption}`);
  };

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex mt-5 justify-around flex-wrap ">
          <div className="w-44 mx-10">
            <select
              {...register("language")}
              className="select select-ghost w-full max-w-xs"
              defaultValue=""
            >
              <option value="">Filter by language</option>
              <option>English</option>
              <option>Bangla</option>
              <option>Hindi</option>
              <option>Arabic</option>
              <option>Chinese</option>
            </select>
          </div>

          <div className="w-44 mx-10">
            <select
              {...register("genre")}
              className="select select-ghost w-full max-w-xs"
              defaultValue=""
            >
              <option value="">Filter by genre</option>
              <option>Adventure</option>
              <option>Fiction</option>
              <option>Fantacy</option>
              <option>Thriller</option>
              <option>Romance</option>
            </select>
          </div>
          <div className="w-44 mx-10">
            <select
              {...register("series")}
              className="select select-ghost w-full max-w-xs"
              defaultValue=""
            >
              <option value="">Filter by series</option>
              <option>Harry Potter</option>
              <option>The Lord of the Rings</option>
              <option>Game of Thrones</option>
              <option>The Hunger Games</option>
              <option>Percy Jackson & the Olympians</option>
            </select>
          </div>
          <div className="w-44 mx-10">
            <select
              {...register("format")}
              className="select select-ghost w-full max-w-xs"
              defaultValue=""
            >
              <option value="">Filter by format</option>
              <option>hardcover</option>
              <option>paperback</option>
              <option>e-book</option>
            </select>
          </div>
          <div className="w-44 mx-10">
            <Input
              {...register("releaseDate")}
              type="date"
              variant="standard"
              label="Filter by date"
              placeholder="Standard"
            />
          </div>
          <div className="w-44">
            <Input
              {...register("author")}
              variant="standard"
              label="Filter by author"
              placeholder="Standard"
              crossOrigin="anonymous"
            />
          </div>
          <div className="w-44">
            <Input
              {...register("publisher")}
              variant="standard"
              label="Filter by publisher"
              placeholder="Standard"
              crossOrigin="anonymous"
            />
          </div>
          <div className="w-44">
            <Input
              {...register("isbn")}
              variant="standard"
              label="Filter by ISBN"
              placeholder="Standard"
              crossOrigin="anonymous"
            />
          </div>
          <div className="w-44">
            <Input
              {...register("minPrice")}
              type="number"
              variant="standard"
              label="Filter by min price"
              placeholder="Standard"
              crossOrigin="anonymous"
            />
          </div>
          <div className="w-44">
            <Input
              {...register("maxPrice")}
              type="number"
              variant="standard"
              label="Filter by max price"
              placeholder="Standard"
              crossOrigin="anonymous"
            />
          </div>
        </div>
        <Button type="submit" className="my-5" fullWidth  placeholder={"filter"}>
          Filter
        </Button>
      </form>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="search book or author"
          onChange={(e) => setsearchOption(e.target.value)}
          className="input input-bordered input-primary w-full max-w-xs"
        />

        <button
          onClick={searchParam}
          className="text-white border-0 py-2 ml-2 px-8 focus:outline-none bg-indigo-600 rounded text-lg"
        >
          search
        </button>
      </div>
      <Allbooks queryParam={searchQueryParam + "&" + queryparam} />
    </div>
  );
};

export default BookLayout;
