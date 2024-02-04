import { useGetAllProductQuery } from "../../../redux/features/product/productApi";
import {
  Spinner,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
const Allbooks = () => {
  const { data, error, isLoading } = useGetAllProductQuery();
  if (isLoading) {
    <Spinner className="h-16 w-16 text-gray-900/50" />;
  }
  if (error) {
    <div>error</div>;
  }
  console.log(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 gap-6">
      { data && data.data.map((product) => (
        <div >
          <Card className="w-64">
            <CardHeader shadow={false} floated={false} className="h-44">
              <img
                src={product.imageurl}
                alt="card-image"
                className="h-44 w-full object-cover"
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
            <Button>Detials</Button>
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
        </div>
      ))}
    </div>
  );
};

export default Allbooks;
