import ErrorMessage from "../../common/Error/Error.jsx";
import Input from "../../common/Input/Input.jsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../../schemas/admin/changePasswordSchema.js";
import Button from "../../common/Button/Button.jsx";

export default function ChangePassword({ setModalOpen }) {
  const [apiError, setApiError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  async function onFormSubmit(e) {
    e.preventDefault();
    setApiError("dsfjhgs");
  }

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <ErrorMessage message={""} variant="background" />
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <Input
            label="New Password*"
            {...register("newPassword")}
            showErrorIcon={false}
            error={errors.newPassword?.message}
          />
          <Input
            label="Confirm New Password*"
            {...register("confirmNewPassword")}
            showErrorIcon={false}
            type="password"
            error={errors.confirmNewPassword?.message}
          />
          <Button variant="primary" type="submit">
            Change
          </Button>
        </form>
      </div>
    </>
  );
}
