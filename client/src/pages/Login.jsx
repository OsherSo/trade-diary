import { Form, redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import customFetch from "../utils/customFetch";
import { FormRow, Logo, SubmitBtn } from "../components";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Login failed");
    return error;
  }
};

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <Form method="post" className="mt-8 space-y-6">
          <div className="text-center">
            <Logo />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Login
            </h2>
          </div>
          <FormRow type="text" name="username" />
          <FormRow type="password" name="password" />
          <SubmitBtn />
          <div className="text-sm text-center">
            <p>
              Not a member yet?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
