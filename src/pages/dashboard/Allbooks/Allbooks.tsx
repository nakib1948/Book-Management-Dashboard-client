/* eslint-disable */
import { useEffect, useState } from "react";
import {
  Spinner,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  useDeletebookMutation,
  useGetAllProductQuery,
} from "../../../redux/features/product/productApi";
import Updatebook from "../updatebook/Updatebook";
import toast, { Toaster } from "react-hot-toast";
import CreateVariant from "../CreateVariant/CreateVariant";
import Sales from "../sales/Sales";
import { useAppSelector } from "../../../redux/hook";
import { useCurrentUser } from "../../../redux/features/user/userSlice";
import { useAddProductToCartMutation } from "../../../redux/features/cart/cartApi";

type TCart = {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  userEmail: string;
};

const Allbooks = ({ queryParam }) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const { data, error, isLoading, refetch } = useGetAllProductQuery(queryParam);
  const [deletebook, { error: deleteerror }] = useDeletebookMutation();
  const [cartdata, { error: carterror }] = useAddProductToCartMutation();
  const [openNav, setOpenNav] = useState(false);
  const user = useAppSelector(useCurrentUser);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((id) => id !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setOpen(false);
  };
  const handleDelete = async () => {
    const res = await deletebook(selectedItems).unwrap();
    toast.success(`${res.message}`);
    refetch();
  };
  const addToCart = async (data: TCart) => {
    const cartData = {
      productId: data._id,
      productName: data.name,
      price: data.price,
      quantity: 0,
      userEmail: user?.userEmail,
    };
    const res = await cartdata(cartData).unwrap();
    toast.success(`${res.message}`);
  };

  if (isLoading) {
    return (
      <Spinner className="h-16 flex justify-center w-16 text-gray-900/50" />
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (carterror) {
    toast.error(`${carterror.data.message}`);
  }
  return (
    <div>
      {selectedItems.length > 0 ? (
        <Button onClick={handleDelete} className="ml-10" color="red">
          Delete Selected
        </Button>
      ) : (
        <></>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 gap-6">
        {data &&
          data.data.map((product, index) => (
            <div key={index}>
              <Card className="w-64 md:w-96 lg:w-96">
                <CardHeader shadow={false} floated={false} className="h-64">
                  <img
                    src={product.imageurl}
                    alt="card-image"
                    className="h-64 w-full"
                  />
                </CardHeader>
                <CardBody>
                  <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                      {product.name}
                    </Typography>
                    <Button
                      onClick={() =>
                        document
                          .getElementById(`newBookModal_${product._id}`)
                          .showModal()
                      }
                      className="bg-blue-gray-300"
                      disabled={
                        user?.userEmail !== product.userEmail &&
                        user?.userRole !== "manager"
                      }
                    >
                      Create Variant
                    </Button>
                  </div>
                  <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                      ${product.price}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                      Quantity: {product.quantity}
                    </Typography>
                  </div>
                </CardBody>
                <CardFooter className="pt-0">
                  <div className="mb-2 flex items-center justify-between">
                    <Button
                      disabled={
                        user?.userEmail !== product.userEmail &&
                        user?.userRole !== "manager"
                      }
                      onClick={() => handleOpen(product)}
                    >
                      Details
                    </Button>
                    <Button
                      onClick={() =>
                        document
                          .getElementById(`updateBookModal_${product._id}`)
                          .showModal()
                      }
                      disabled={
                        user?.userEmail !== product.userEmail &&
                        user?.userRole !== "manager"
                      }
                    >
                      update
                    </Button>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input
                          disabled={
                            user?.userEmail !== product.userEmail &&
                            user?.userRole !== "manager"
                          }
                          type="checkbox"
                          checked={selectedItems.includes(product._id)}
                          onChange={() => handleCheckboxChange(product._id)}
                          className="checkbox checkbox-primary"
                        />
                        <span className="ml-1 font-bold text-lg text-red-400 label-text">
                          Delete
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-2 flex items-center justify-around">
                    <Button
                      className="w-full mx-2"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Dialog open={open} handler={handleClose}>
                <DialogHeader>Details</DialogHeader>
                <DialogBody className="text-center">
                  <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Author: {selectedProduct?.author}
                  </h5>
                  <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Publisher: {selectedProduct?.publisher}
                  </h5>
                  <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Release Date: {selectedProduct?.releaseDate}
                  </h5>
                  <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Isbn: {selectedProduct?.isbn}
                  </h5>
                  <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Series: {selectedProduct?.series}
                  </h5>
                  <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Genre: {selectedProduct?.genre}
                  </h5>
                  <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Language: {selectedProduct?.language}
                  </h5>
                  <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Format: {selectedProduct?.format}
                  </h5>
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="gradient"
                    color="green"
                    onClick={handleClose}
                  >
                    <span>Close</span>
                  </Button>
                </DialogFooter>
              </Dialog>
              <dialog id={`updateBookModal_${product._id}`} className="modal ">
                <div className="modal-box bg-gray-900 modal-bottom sm:modal-middle">
                  <Updatebook refetch={refetch} product={product} />
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>

              <dialog id={`newBookModal_${product._id}`} className="modal ">
                <Toaster />
                <div className="modal-box bg-gray-900 modal-bottom sm:modal-middle">
                  <CreateVariant refetch={refetch} product={product} />
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Allbooks;
