import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const url = `${import.meta.env.VITE_BACK_URL}user/login`;
      const response = await axios.post(url, data);
      const token = response.data.token;
      sessionStorage.setItem("authToken", token);
      toast.success("Login successful!");
      // Redirect or update auth state here
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error?: string }>;

      const message =
        axiosError.response?.data?.error ||
        "RLogin failed. Check your username/password.";

      console.error("Registration Error:", message);
      toast.error(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] p-4 bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg w-full mx-auto space-y-8 p-10 bg-white rounded-2xl shadow-xl border border-gray-300"
      >
        <div>
          <h1 className="pb-5 text-4xl font-bold ">Login</h1>
          <Label htmlFor="username" className="text-lg font-semibold">
            Username
          </Label>
          <Input
            id="username"
            {...register("username", { required: "Username is required" })}
            type="text"
            placeholder="Enter username"
            className="text-lg py-3"
          />
          {errors.username && (
            <p className="mt-1 text-red-600 text-sm">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="text-lg font-semibold">
            Password
          </Label>
          <Input
            id="password"
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Enter password"
            className="text-lg py-3"
          />
          {errors.password && (
            <p className="mt-1 text-red-600 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 text-lg"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
