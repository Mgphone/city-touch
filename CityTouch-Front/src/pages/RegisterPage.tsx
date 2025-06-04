import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
  creatorPassword: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const url = `${import.meta.env.VITE_BACK_URL}user/register`;
      const { username, password, creatorPassword } = data;
      await axios.post(url, { username, password, creatorPassword });
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error?: string }>;

      const message =
        axiosError.response?.data?.error || "Registration failed. Try again.";

      console.error("Registration Error:", message);
      toast.error(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] p-4 bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full mx-auto space-y-8 p-10 bg-white rounded-2xl shadow-xl border border-gray-300"
      >
        <h1 className="pb-5 text-4xl font-bold text-center">Register</h1>

        {/* Username */}
        <div>
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

        {/* Password */}
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

        {/* Confirm Password */}
        <div>
          <Label htmlFor="confirmPassword" className="text-lg font-semibold">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Repeat password"
            className="text-lg py-3"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-red-600 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Secret */}
        <div>
          <Label htmlFor="creatorPassword" className="text-lg font-semibold">
            Creator Password
          </Label>

          <Input
            id="creatorPassword"
            {...register("creatorPassword", { required: "Secret is required" })}
            type="password"
            placeholder="Enter creator password"
            className="text-lg py-3"
          />
          {errors.creatorPassword && (
            <p className="mt-1 text-red-600 text-sm">
              {errors.creatorPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 text-lg"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
