"use client";

import { useState } from "react";
import { X, Loader2, Image as ImageIcon } from "lucide-react";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export default function ImageUpload({ value, onChange, label = "Upload Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      
      onChange(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload");
    } finally {
      setUploading(false);
      // Reset input value so same file can be selected again if removed
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-brand-dark">{label}</label>
      
      {error && <p className="text-xs text-red-500">{error}</p>}
      
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-sky-200 bg-sky-50 aspect-video w-full max-w-sm group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Uploaded preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              type="button" 
              onClick={() => onChange("")} 
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
              title="Remove image"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <label className={`flex flex-col items-center justify-center w-full max-w-sm aspect-video border-2 border-dashed rounded-xl cursor-pointer transition-colors ${uploading ? 'bg-sky-50 border-sky-300' : 'bg-white border-sky-200 hover:bg-sky-50 hover:border-brand-primary'}`}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            {uploading ? (
              <>
                <Loader2 size={32} className="text-brand-primary mb-3 animate-spin" />
                <p className="text-sm text-brand-dark font-medium">Uploading...</p>
              </>
            ) : (
              <>
                <div className="p-3 bg-sky-100 rounded-full mb-3 text-brand-primary">
                  <ImageIcon size={24} />
                </div>
                <p className="text-sm text-brand-dark font-medium mb-1">
                  <span className="text-brand-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-sky-400">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </>
            )}
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        </label>
      )}
    </div>
  );
}
