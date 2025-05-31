import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Step4() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  const data = getValues();

  return (
    <div className="space-y-4">
      <Label htmlFor="date">Booking Date</Label>
      <Input
        id="date"
        type="date"
        {...register("date", { required: "Date is required" })}
      />
      {errors.date && (
        <p className="text-red-500">{errors.date.message as string}</p>
      )}

      <div className="mt-4 p-2 border rounded bg-muted">
        <p>
          <strong>Summary Preview:</strong>
        </p>
        <ul className="text-sm list-disc list-inside">
          <li>
            <strong>Name:</strong> {data.name}
          </li>
          <li>
            <strong>Email:</strong> {data.email}
          </li>
          <li>
            <strong>Address:</strong> {data.address}
          </li>
          <li>
            <strong>Date:</strong> {data.date}
          </li>
        </ul>
      </div>
    </div>
  );
}
