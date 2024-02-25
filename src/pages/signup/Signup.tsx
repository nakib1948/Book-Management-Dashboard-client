import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Option,
  Button,
  Select,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../redux/features/user/userApi";
import { useState } from "react";
type TUser = {
  name: string;
  email: string;
  password: string;
};
const Signup = () => {
  const [role, setRole] = useState("user");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [signup, { error }] = useSignupMutation();
  const navigate = useNavigate();
  if (error) {
    toast.error(`${error.data.message}: ${error.data.errorMessage}`);
  }
  const onSubmit = async (data: TUser) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      role
    };
    const res = await signup(userInfo).unwrap();
    await toast.success(`${res.message}`)
    navigate("/login")
  };
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
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input {...register("name")} label="Name" size="lg" />
            <Input {...register("email")} label="Email" size="lg" />
            <Input {...register("password")} label="Password" size="lg" />
            <Select
            value={role}
            onChange={(val) => setRole(val)}
              label="Select Role"
            >
              <Option value="user">user</Option>
              <Option value="manager">manager</Option>
            </Select>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              type="submit"
              color="light-blue"
              variant="gradient"
              fullWidth
            >
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                variant="small"
                color="light-blue"
                className="ml-1 font-bold"
              >
                <Link to="/login"> Sign In</Link>
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Signup;
