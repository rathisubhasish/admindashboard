import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { LuUpload } from "react-icons/lu";
import { post } from "../../network";
import ErrorMessage from "../Error/Error.jsx";

export default function FileUpload({
  label,
  id,
  accept,
  variant = "button",
  disabled = false,
  onUploadStart,
  onUploadComplete,
  onUploadError,
  className = "",
}) {
  const inputRef = useRef(null);
  const previewRef = useRef("");
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Release the last object URL when the component goes away.
  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const nextPreview = file.type?.startsWith("image/")
      ? URL.createObjectURL(file)
      : "";
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = nextPreview;
    setPreview(nextPreview);

    setFileName(file.name);
    setError("");
    setUploading(true);
    onUploadStart?.(file);

    try {
      const { data } = await post("/presigned-upload", {
        fileName: file.name,
        contentType: file.type || "application/octet-stream",
      });

      const { uploadUrl, objectKey } = data;

      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type || "application/octet-stream" },
      });

      onUploadComplete?.({ objectKey, file });
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "File upload failed";
      setError(message);
      onUploadError?.(err);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const isLocked = disabled || uploading;

  const fileInput = (
    <input
      ref={inputRef}
      id={id}
      type="file"
      accept={accept}
      disabled={isLocked}
      onChange={handleChange}
      className="hidden"
    />
  );

  if (variant === "avatar") {
    return (
      <div className={`flex flex-col items-center gap-[8px] ${className}`}>
        <label
          htmlFor={id}
          className={`flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full border-[1.5px] border-dashed border-border bg-primary-light text-primary-text ${
            isLocked ? "cursor-not-allowed opacity-70" : "cursor-pointer"
          }`}
        >
          {preview ? (
            <img
              src={preview}
              alt={label || "Upload preview"}
              className="h-full w-full object-cover"
            />
          ) : (
            <LuUpload size={20} />
          )}
          {fileInput}
        </label>

        <span className="text-[12px] text-text-secondary">
          {uploading ? "Uploading..." : label}
        </span>

        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={isLocked}
          onClick={() => inputRef.current?.click()}
          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Choose file"}
        </button>

        <span className="truncate text-sm text-gray-500">
          {fileName || "No file chosen"}
        </span>

        {fileInput}
      </div>

      <ErrorMessage message={error} />
    </div>
  );
}
