import { Card, Button, Select, Option, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useSellbookMutation } from "../../../redux/features/sales/salesApi";
import { useAppSelector } from "../../../redux/hook";
import { useCurrentUser } from "../../../redux/features/user/userSlice";
const Sales = ({ product, refetch }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [salebook, { error }] = useSellbookMutation();
  const user = useAppSelector(useCurrentUser);
  const onSubmit = async (data) => {
   
    const sell = {
      buyerName: data.buyerName,
      quantity: Number(data.quantity),
      productName: data.productName,
      date: data.date,
      productId: product.productId,
      contactNumber:data.contact,
      userEmail:user?.userEmail
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
                {...register("buyerName", { required: true })}
              />
                {errors.buyerName?.type === "required" && (
                    <small className="text-red-500" role="alert">
                      {" "}
                      buyerName is required
                    </small>
                  )}
            </div>
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="quantity"
                type="number"
                placeholder="Standard"
                min={0}
                max={product.quantity}
                {...register("quantity", { required: true },)}
              />
               {errors.quantity?.type === "required" && (
                    <small className="text-red-500" role="alert">
                      {" "}
                      quantity is required
                    </small>
                  )}
            </div>
          </div>

          <div className="lg:flex mt-5">
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="productName"
                placeholder="Standard"
                {...register("productName", { required: true })}
                defaultValue={product.productName}
              />
                {errors.productName?.type === "required" && (
                    <small className="text-red-500" role="alert">
                      {" "}
                      productName is required
                    </small>
                  )}
            </div>
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="date "
                type="date"
                placeholder="Standard"
                {...register("date", { required: true })}
              />
                {errors.date?.type === "required" && (
                    <small className="text-red-500" role="alert">
                      {" "}
                      date is required
                    </small>
                  )}
            </div>
          </div>
          <div className="lg:flex mt-5">
            <div className="form-control mx-auto w-full max-w-md lg:w-1/2 lg:pr-2">
              <Input
                variant="standard"
                label="Contact Number"
                placeholder="Standard"
                {...register("contact", { required: true })}
              />
                {errors.contact?.type === "required" && (
                    <small className="text-red-500" role="alert">
                     
                      contact is required
                    </small>
                  )}
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
