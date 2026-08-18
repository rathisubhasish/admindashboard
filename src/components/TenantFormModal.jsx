import { useEffect, useState } from "react";
import Modal from "../common/Modal/Modal";
import Input from "../common/Input/Input";
import FileUpload from "../common/FileUpload/FileUpload.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tenantSchema } from "../schemas/tenant/tenantSchema.js";
import Button from "../common/Button/Button.jsx";
import ErrorMessage from "../common/Error/Error.jsx";
import { useTenants } from "../context/TenantContext.jsx";
const EMPTY_FORM = {
  name: "",
  legalName: "",
  mobile: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
  country: "",
};
export default function TenantFormModal({
  onClose,
  type = "add",
  tenantData = null,
}) {
  const { addTenant, updateTenant } = useTenants();
  const isEdit = type === "edit";
  const [logoObjectKey, setLogoObjectKey] = useState(tenantData?.logoUrl || "");
  const [isUploadingLogo, setUploadingLogo] = useState(false);
  const [apiError, setApiError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(tenantSchema),
    defaultValues: EMPTY_FORM,
  });

  useEffect(() => {
    if (isEdit && tenantData) {
      reset({
        name: tenantData.name || "",
        legalName: tenantData.legalName || "",
        mobile: tenantData.mobile || "",
        email: tenantData.email || "",
        address: tenantData.address || "",
        city: tenantData.city || "",
        state: tenantData.state || "",
        pinCode: tenantData.pinCode || "",
        country: tenantData.country || "",
      });
    } else {
      reset(EMPTY_FORM);
    }
  }, [isEdit, tenantData, reset]);

  async function onFormEditSubmit(data) {
    setApiError("");

    const result = await updateTenant(tenantData?.id, {
      ...data,
      logoUrl: logoObjectKey,
    });

    if (!result.success) {
      const fieldErrors = result.error?.errors;

      if (Object.keys(fieldErrors || {}).length > 0) {
        const message = Object.entries(fieldErrors)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");

        setApiError(message);
      } else {
        setApiError(result.error?.message || "Failed to edit tenant");
      }

      return;
    }

    onClose();
  }

  async function onFormSubmit(data) {
    setApiError("");

    const result = await addTenant({
      ...data,
      logoUrl: logoObjectKey,
    });

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
    <Modal title={isEdit ? "Edit Tenant" : "Add Tenant"} onClose={onClose}>
      <div className="w-full overflow-x-hidden">
        {apiError && <ErrorMessage message={apiError} variant={"background"} />}
        <br />
        <form onSubmit={handleSubmit(isEdit ? onFormEditSubmit : onFormSubmit)}>
          {/* Logo */}
          <FileUpload
            id="tenant-logo"
            label="Upload logo"
            variant="avatar"
            accept="image/*"
            disabled={isSubmitting}
            className="mb-[20px]"
            onUploadStart={() => {
              setUploadingLogo(true);
              setLogoObjectKey("");
            }}
            onUploadComplete={({ objectKey }) => {
              setUploadingLogo(false);
              setLogoObjectKey(objectKey);
            }}
            onUploadError={() => setUploadingLogo(false)}
          />
          {/* Fields */}
          <div className="grid grid-cols-2 gap-x-[16px] gap-y-[14px]">
            <Input
              label="Name*"
              {...register("name")}
              showErrorIcon={false}
              error={errors.name?.message}
            />
            <Input
              label="Legal Name"
              {...register("legalName")}
              showErrorIcon={false}
              error={errors.legalName?.message}
            />
            <Input
              label="Mobile*"
              {...register("mobile")}
              showErrorIcon={false}
              error={errors.mobile?.message}
            />
            <Input
              label="Email*"
              type="email"
              {...register("email")}
              showErrorIcon={false}
              error={errors.email?.message}
            />
            <Input
              label="Address*"
              containerClassName="col-span-full"
              {...register("address")}
              showErrorIcon={false}
              error={errors.address?.message}
            />
            <Input
              label="City*"
              {...register("city")}
              error={errors.city?.message}
              showErrorIcon={false}
            />
            <Input
              label="State*"
              {...register("state")}
              error={errors.state?.message}
              showErrorIcon={false}
            />
            <Input
              label="Pincode*"
              {...register("pinCode")}
              error={errors.pinCode?.message}
              showErrorIcon={false}
            />
            <Input
              label="Country*"
              {...register("country")}
              error={errors.country?.message}
              showErrorIcon={false}
            />
          </div>
          {/* Actions */}
          <div className="mt-[24px] flex justify-end gap-[10px] ">
            {isEdit ? (
              <Button
                type="submit"
                variant={"primary"}
                disabled={isSubmitting || isUploadingLogo}
                loading={isSubmitting}
              >
                {isSubmitting ? "Editing" : "Edit Tenant"}
              </Button>
            ) : (
              <Button
                type="submit"
                variant={"primary"}
                disabled={isSubmitting || isUploadingLogo}
                loading={isSubmitting}
              >
                {isSubmitting ? "Adding" : "Add Tenant"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}
