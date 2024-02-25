/* eslint-disable */
import { Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useAddbookMutation } from "../../../redux/features/product/productApi";
import toast from "react-hot-toast";
import { useAppSelector } from "../../../redux/hook";
import { useCurrentUser } from "../../../redux/features/user/userSlice";
const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;
interface FormData {
    name: string;
    price: number;
    quantity: number;
    imageurl: string;
    releaseDate: string;
    author: string;
    isbn: string;
    genre: string;
    publisher: string;
    series: string;
    language: string;
    format: string;
  }
const Addbook = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [addbook, { error }] = useAddbookMutation();
  const user = useAppSelector(useCurrentUser)
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const onSubmit = async (data:FormData) => {
   
    const formData = new FormData();
    formData.append("image", data.imageurl[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (imgResponse) => {
        const imageurl = imgResponse.data.display_url;

        const uploadBook = {
          name: data.name,
          price: Number(data.price),
          quantity: Number(data.quantity),
          imageurl: imageurl,
          releaseDate: data.releaseDate,
          author: data.author,
          isbn: data.isbn,
          genre: data.genre,
          publisher: data.publisher,
          series: data.series,
          language: data.language,
          format: data.format,
          userEmail: user?.userEmail
        };
        const res = await addbook(uploadBook).unwrap();
        toast.success(`${res.message}`);
        reset()
      });
  };
  if (error) {
    toast.error(`${error.data.message}: ${error.data.errorMessage}`);
  }
  console.log(user?.userRole)
  return (
    <div>
      <div className="bg-white rounded-lg p-8 flex  flex-col  w-full mt-10 mx-auto shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:flex ">
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="Book Name"
                placeholder="Standard"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  name is required
                </small>
              )}
            </div>
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="Author Name"
                placeholder="Standard"
                {...register("author", { required: true })}
              />
              {errors.author?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  author name is required
                </small>
              )}
            </div>
          </div>

          <div className="lg:flex mt-5">
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="Publisher Name"
                placeholder="Standard"
                {...register("publisher", { required: true })}
              />
              {errors.publisher?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  publisher name is required
                </small>
              )}
            </div>
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="releaseDate "
                type="date"
                placeholder="Standard"
                {...register("releaseDate", { required: true })}
              />
              {errors.releaseDate?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  releaseDate name is required
                </small>
              )}
            </div>
          </div>

          <div className="lg:flex mt-5">
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                type="number"
                label="Quantity"
                placeholder="Standard"
                {...register("quantity", { required: true })}
              />
              {errors.quantity?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  quantity is required
                </small>
              )}
            </div>
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="price"
                type="number"
                placeholder="Standard"
                {...register("price", { required: true })}
              />
              {errors.price?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  price is required
                </small>
              )}
            </div>
          </div>
          <div className="lg:flex mt-5">
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="ISBN code"
                placeholder="Standard"
                {...register("isbn", { required: true })}
              />
              {errors.isbn?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  isbn code is required
                </small>
              )}
            </div>
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="book image"
                type="file"
                placeholder="Standard"
                {...register("imageurl", { required: true })}
              />
              {errors.imageurl?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  book image is required
                </small>
              )}
            </div>
          </div>

          <div className="lg:flex mt-5">
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <select
                {...register("language", { required: true })}
                className="select select-ghost w-full max-w-xs"
                defaultValue=""
              >
                <option value="">Choose language</option>
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
                {...register("genre", { required: true })}
                className="select select-ghost w-full max-w-xs"
                defaultValue=""
              >
                <option value="">Choose genre</option>
                <option>Adventure</option>
                <option>Fiction</option>
                <option>Fantacy</option>
                <option>Thriller</option>
                <option>Romance</option>
              </select>
              {errors.genre?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  genre is required
                </small>
              )}
            </div>
          </div>
          <div className="lg:flex mt-5">
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <select
                {...register("series", { required: true })}
                className="select select-ghost w-full max-w-xs"
                defaultValue=""
              >
                <option value="">Choose series</option>
                <option>Harry Potter</option>
                <option>The Lord of the Rings</option>
                <option>Game of Thrones</option>
                <option>The Hunger Games</option>
                <option>Percy Jackson & the Olympians</option>
              </select>
              {errors.series?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  series is required
                </small>
              )}
            </div>
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <select
                {...register("format", { required: true })}
                className="select select-ghost w-full max-w-xs"
                defaultValue=""
              >
                <option value="">Choose format</option>
                <option>hardcover</option>
                <option>paperback</option>
                <option>e-book</option>
              </select>
              {errors.format?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  format is required
                </small>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn mt-5 btn-block text-xl text-white btn-primary"
          >
            Add Book
          </button>
        </form>
        ;
      </div>
    </div>
  );
};

export default Addbook;
