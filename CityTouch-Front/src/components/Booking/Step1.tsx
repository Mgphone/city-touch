import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Step1() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        {...register("name", { required: "Name is required" })}
      />
      {errors.name && (
        <p className="text-red-500">{errors.name.message as string}</p>
      )}
    </div>
  );
}
