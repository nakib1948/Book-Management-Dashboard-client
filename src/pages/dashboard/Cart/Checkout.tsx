import {
  Card,
  Typography,
  Spinner,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import {
  useGetcartInformationQuery,
  useQuantityUpdateMutation,
} from "../../../redux/features/cart/cartApi";
import { useAppSelector } from "../../../redux/hook";
import { useCurrentUser } from "../../../redux/features/user/userSlice";
import toast, { Toaster } from "react-hot-toast";
import Sales from "../sales/Sales";
import { useState } from "react";
const TABLE_HEAD = [
  "Product Id",
  "Product Name",
  "Price",
  "Quantity",
  "Sell",
  "Action",
];

const Checkout = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const user = useAppSelector(useCurrentUser);
  const { data, error, isLoading, refetch } = useGetcartInformationQuery(
    user?.userEmail
  );
  const [quantityupdate, { error: quantityUpdateError }] =
    useQuantityUpdateMutation();
  if (isLoading) {
    <Spinner className="h-16 w-16 text-gray-900/50" />;
  }
  if (quantityUpdateError) {
    toast.error(`${quantityUpdateError.data.message}`);
  }
  const quantityUpdate = async (productId, type) => {
    const quantityUpdateData = {
      productId,
      userEmail: user?.userEmail,
      type,
    };
    const res = await quantityupdate(quantityUpdateData).unwrap();
    toast.success(`${res.message}`);
    refetch();
  };
  const handleOpen = async (data) => {
    await setSelectedProduct(data);
    await setOpen(!open);
  };

  return (
    <div className="m-10">
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.data.map((product, index) => {
              const isLast = index === product.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <>
                  <tr key={index}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.productId}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.productName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.price} $
                      </Typography>
                    </td>
                    <td className={classes}>
                      <button
                        onClick={() =>
                          quantityUpdate(product.productId, "decrease")
                        }
                        className="btn mr-1 text-2xl "
                        disabled={product.quantity === 0}
                      >
                        -
                      </button>
                      <span className="text-xl font-bold">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() =>
                          quantityUpdate(product.productId, "increase")
                        }
                        className="btn ml-1 text-2xl "
                      >
                        +
                      </button>
                    </td>
                    <td className={classes}>
                      <Button onClick={() => handleOpen(product)}>Sell</Button>
                    </td>
                    <td className={classes}>
                      <Button color="red">Remove</Button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        {selectedProduct && (
          <Dialog open={open} size="md" handler={handleOpen}>
            <DialogBody>
              <Sales product={selectedProduct} refetch={refetch} />
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button variant="text" color="gray" onClick={handleOpen}>
                cancel
              </Button>
            </DialogFooter>
          </Dialog>
        )}
      </Card>
    </div>
  );
};

export default Checkout;
