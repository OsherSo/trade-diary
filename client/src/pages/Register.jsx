import { Form, redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import customFetch from "../utils/customFetch";
import { FormRow, Logo, SubmitBtn } from "../components";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Registration failed");
    return error;
  }
};

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <Form method="post" className="mt-8 space-y-6">
          <div className="text-center">
            <Logo />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Register
            </h2>
          </div>
          <FormRow type="text" name="username" />
          <FormRow type="password" name="password" />
          <SubmitBtn />
          <div className="text-sm text-center">
            <p>
              Already a member?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
