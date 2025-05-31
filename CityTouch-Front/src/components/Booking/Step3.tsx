import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Step3() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <Label htmlFor="address">Address</Label>
      <Input
        id="address"
        {...register("address", { required: "Address is required" })}
      />
      {errors.address && (
        <p className="text-red-500">{errors.address.message as string}</p>
      )}
    </div>
  );
}
