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
  Navbar,
  MobileNav,
  IconButton,
  Input,
  Select, Option
} from "@material-tailwind/react";
import { useGetAllProductQuery } from "../../../redux/features/product/productApi";

const Allbooks = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data, error, isLoading } = useGetAllProductQuery();
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setOpen(false);
  };

  if (isLoading) {
    return <Spinner className="h-16 w-16 text-gray-900/50" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
           <div className="flex justify-center">
            <input
              type="text"
              placeholder="search book or author"
              className="input input-bordered input-primary w-full max-w-xs"
             
            />
          
          <button
         
            className="text-white border-0 py-2 ml-2 px-8 focus:outline-none bg-indigo-600 rounded text-lg"
          >
            search
          </button>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 gap-6">
        {data &&
          data.data.map((product, index) => (
            <div key={index}>
              <Card className="w-64 md:w-80 lg:w-80">
                <CardHeader shadow={false} floated={false} className="h-44">
                  <img
                    src={product.imageurl}
                    alt="card-image"
                    className="h-44 w-full"
                  />
                </CardHeader>
                <CardBody>
                  <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                      {product.name}
                    </Typography>
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
                    <Button onClick={() => handleOpen(product)}>Details</Button>
                    <Button color="red">Delete</Button>
                  </div>
                  <Button
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  >
                    Sell
                  </Button>
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default Allbooks;
