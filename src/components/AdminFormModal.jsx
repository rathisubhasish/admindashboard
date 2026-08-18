import { useAdmins } from "../context/AdminContext.jsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminSchema } from "../schemas/admin/adminSchema.js";
import ErrorMessage from "../common/Error/Error.jsx";
import { LuUpload } from "react-icons/lu";
import Input from "../common/Input/Input.jsx";
import Button from "../common/Button/Button.jsx";
import Modal from "../common/Modal/Modal.jsx";

export default function AdminFormModal({ onClose }) {
  const EMPTY_FORM = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const { addAdmin } = useAdmins();
  const [apiError, setApiError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: EMPTY_FORM,
  });

  async function onFormSubmit(data) {
    setApiError("");

    const result = await addAdmin(data);

    if (!result.success) {
      const fieldErrors = result.error?.errors;

      if (Object.keys(fieldErrors || {}).length > 0) {
        const message = Object.entries(fieldErrors)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");

        setApiError(message);
      } else {
        setApiError(result.error?.message || "Failed to create tenant");
      }

      return;
    }

    onClose();
  }

  return (
    <Modal title="Add Admin" onClose={onClose}>
      <div className="w-full overflow-x-hidden">
        {apiError && <ErrorMessage message={apiError} variant={"background"} />}
        <br />
        <form onSubmit={handleSubmit(onFormSubmit)}>
          {/* Fields */}
          <div className="grid grid-cols-2 gap-x-[16px] gap-y-[14px]">
            <Input
              label="First Name*"
              {...register("firstName")}
              showErrorIcon={false}
              error={errors.firstName?.message}
            />
            <Input
              label="Last Name*"
              {...register("lastName")}
              showErrorIcon={false}
              error={errors.lastName?.message}
            />
            <Input
              label="Email*"
              {...register("email")}
              showErrorIcon={false}
              error={errors.email?.message}
            />
            <Input
              label="Password*"
              {...register("password")}
              showErrorIcon={false}
              type="password"
              error={errors.password?.message}
            />
          </div>
          {/* Actions */}
          <div className="mt-[24px] flex justify-end gap-[10px] ">
            <Button
              type="submit"
              variant={"primary"}
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              {isSubmitting ? "Adding" : "Add Admin"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
