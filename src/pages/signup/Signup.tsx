import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
  import { useForm } from "react-hook-form";

const Signup = () => {
    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="w-96 mx-auto my-20">
            <CardHeader
              variant="gradient"
              color="light-blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign In
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input {...register("email")} label="Email" size="lg" />
              <Input {...register("password")} label="Password" size="lg" />
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                type="submit"
                color="light-blue"
                variant="gradient"
                fullWidth
              >
                Sign In
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Don&apos;t have an account?
                <Typography
                  as="a"
                  href="#signup"
                  variant="small"
                  color="light-blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </form>
      </div>
    );
};

export default Signup;