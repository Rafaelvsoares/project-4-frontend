declare global {
  interface Window {
    cloudinary: {
      config: (options: CloudinaryOptions) => void;
      uploader: CloudinaryUploader;
      url: (publicId: string, options?: TransformationOptions) => string;
    };
  }
}

interface CloudinaryOptions {
  cloud_name: string;
  api_key?: string;
  api_secret?: string;
  secure?: boolean;
  cdn_subdomain?: boolean;
  private_cdn?: boolean;
  cname?: string;
  protocol?: string;
  resource_type?: string;
  version?: string;
}

interface CloudinaryUploader {
  upload: (file: File, options?: UploadOptions) => Promise<UploadApiResponse>;
}

interface UploadOptions extends TransformationOptions {
  public_id?: string;
  folder?: string;
}

interface UploadApiResponse {
  public_id: string;
  secure_url: string;
  error?: {
    message: string;
  };
}

interface TransformationOptions {
  angle?: number;
  aspect_ratio?: string;
  background?: string;
  border?: string;
  color?: string;
  crop?: string;
  default_image?: string;
  delay?: number;
  density?: number;
  dpr?: number;
  effect?: string;
  fetch_format?: string;
  flags?: string;
  format?: string;
  gravity?: string;
  height?: number;
  opacity?: number;
  overlay?: string;
  page?: number;
  prefix?: string;
  quality?: string;
  radius?: string;
  responsive?: boolean;
  secure?: boolean;
  transformation?: string;
  underlay?: string;
  width?: number;
  x?: number;
  y?: number;
  zoom?: number;
}