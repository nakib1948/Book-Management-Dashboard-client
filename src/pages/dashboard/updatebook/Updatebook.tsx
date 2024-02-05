import { Card, Button, Select, Option, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useAddbookMutation, useUpdatebookMutation } from "../../../redux/features/product/productApi";
import toast, { Toaster } from "react-hot-toast";
const Updatebook = ({product,refetch}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [updatebook, { error }] = useUpdatebookMutation()
  const onSubmit = async (data) => {
   
        const updateBook = {
          name: data.name,
          price: Number(data.price),
          quantity: Number(data.quantity),
          imageurl: data.imageurl,
          releaseDate: data.releaseDate,
          author: data.author,
          isbn: data.isbn,
          genre: data.genre,
          publisher: data.publisher,
          series: data.series,
          language: data.language,
          format: data.format,
        };
        
        const res = await updatebook({id:product._id,data:updateBook}).unwrap();
        toast.success(`${res.message}`);
        refetch()
     
  };
  if (error) {
    toast.error(`${error.data.message}: ${error.data.errorMessage}`);
  }
  return (
    <div>
      <div className="bg-white rounded-lg p-8 flex  flex-col  w-full mt-10 mx-auto shadow-md">
        <Toaster/>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:flex ">
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="Book Name"
                placeholder="Standard"
                defaultValue={product.name}
                {...register("name")}
              />
            </div>
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="Author Name"
                placeholder="Standard"
                defaultValue={product.author}
                {...register("author")}
              />
            </div>
          </div>

          <div className="lg:flex mt-5">
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="Publisher Name"
                placeholder="Standard"
                {...register("publisher")}
                defaultValue={product.publisher}
              />
            </div>
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="releaseDate "
                type="date"
                placeholder="Standard"
                {...register("releaseDate")}
                defaultValue={product.releaseDate}
              />
            </div>
          </div>

          <div className="lg:flex mt-5">
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                type="number"
                label="Quantity"
                placeholder="Standard"
                {...register("quantity")}
                defaultValue={product.quantity}
              />
            </div>
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="price"
                type="number"
                placeholder="Standard"
                {...register("price")}
                defaultValue={product.price}
              />
            </div>
          </div>
          <div className="lg:flex mt-5">
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="ISBN code"
                placeholder="Standard"
                {...register("isbn")}
                defaultValue={product.isbn}
              />
            </div>
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="book image"
                placeholder="Standard"
                defaultValue={product.imageurl}
                {...register("imageurl")}
              />
            </div>
          </div>

          <div className="lg:flex mt-5">
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <select
                {...register("language")}
                className="select select-ghost w-full max-w-xs"
                defaultValue={product.language}
              >
                <option value={product.language}>{product.language}</option>
                <option>English</option>
                <option>Bangla</option>
                <option>Hindi</option>
                <option>Arabic</option>
                <option>Chinese</option>
              </select>
              {errors.language?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  language is required
                </small>
              )}
            </div>
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <select
                {...register("genre")}
                className="select select-ghost w-full max-w-xs"
                defaultValue={product.genre}
              >
                <option value={product.genre}>{product.genre}</option>
                <option>Adventure</option>
                <option>Fiction</option>
                <option>Fantacy</option>
                <option>Thriller</option>
                <option>Romance</option>
              </select>
            </div>
          </div>
          <div className="lg:flex mt-5">
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <select
                {...register("series")}
                className="select select-ghost w-full max-w-xs"
                defaultValue={product.series}
              >
                <option value={product.series}>{product.series}</option>
                <option>Harry Potter</option>
                <option>The Lord of the Rings</option>
                <option>Game of Thrones</option>
                <option>The Hunger Games</option>
                <option>Percy Jackson & the Olympians</option>
              </select>
            </div>
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <select
                {...register("format")}
                className="select select-ghost w-full max-w-xs"
                defaultValue={product.format}
              >
                <option value={product.format}>{product.format}</option>
                <option>hardcover</option>
                <option>paperback</option>
                <option>e-book</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="btn mt-5 btn-block text-xl text-white btn-primary"
          >
            Update Book
          </button>
        </form>
        ;
      </div>
    </div>
  );
};

export default Updatebook;
