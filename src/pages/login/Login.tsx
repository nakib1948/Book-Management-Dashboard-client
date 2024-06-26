import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/user/userApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { verifyToken } from "../../utils/verifyToken";
import { setUser } from "../../redux/features/user/userSlice";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
  } = useForm<FormData>()
  const [login, { error }] = useLoginMutation();

  if (error) {
    toast.error(`${error.data.message}: ${error.data.errorMessage}`);
  }
  const onSubmit = async (data: FormData) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
 
    const user = verifyToken(res.data.token.accessToken)

    await dispatch(setUser({user,token:res.data.token.accessToken}))
    await toast.success("login succesful")
    navigate("/")
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
                variant="small"
                color="light-blue"
                className="ml-1 font-bold"
              >
                <Link to="/signup">Sign up</Link>
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Login;
