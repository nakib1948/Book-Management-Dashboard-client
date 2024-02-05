import { Card, Button, Select, Option, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useSellbookMutation } from "../../../redux/features/sales/salesApi";
const Sales = ({ product, refetch }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [salebook, { error }] = useSellbookMutation();
  const onSubmit = async (data) => {
   
    const sell = {
      buyerName: data.buyerName,
      quantity: Number(data.quantity),
      productName: data.productName,
      date: data.date,
      productId: product._id,
    };
    const res = await salebook(sell).unwrap();
    toast.success(`${res.message}`);
    refetch();
    reset()
  };
  if (error) {
    toast.error(`${error.data.message}: ${error.data.errorMessage}`);
  }

  return (
    <div>
      <div className="bg-white rounded-lg p-8 flex  flex-col  w-full mt-10 mx-auto shadow-md">
        <Toaster />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:flex ">
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="buyerName"
                placeholder="Standard"
                {...register("buyerName")}
              />
            </div>
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="quantity"
                type="number"
                placeholder="Standard"
                {...register("quantity")}
              />
            </div>
          </div>

          <div className="lg:flex mt-5">
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="productName"
                placeholder="Standard"
                {...register("productName")}
                defaultValue={product.name}
              />
            </div>
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="date "
                type="date"
                placeholder="Standard"
                {...register("date")}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn mt-5 btn-block text-xl text-white btn-primary"
          >
            confrim sell
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sales;
