import { del, get, set, keys } from 'idb-keyval';

const MAX_EDGE = 1600;
const JPEG_QUALITY = 0.82;
export const PHOTO_SOFT_LIMIT_BYTES = 12 * 1024 * 1024;

export type StoredPhotoMeta = {
  photoId: string;
  name: string;
  size: number;
  mimeType: string;
};

export async function savePhoto(file: File): Promise<StoredPhotoMeta> {
  const blob = await downscaleImage(file);
  const photoId = crypto.randomUUID();
  await set(photoKey(photoId), blob);
  return {
    photoId,
    name: file.name,
    size: blob.size,
    mimeType: blob.type || file.type,
  };
}

export async function loadPhotoURL(photoId: string): Promise<string | undefined> {
  const blob = await get<Blob>(photoKey(photoId));
  if (!blob) return undefined;
  return URL.createObjectURL(blob);
}

export async function deletePhoto(photoId: string) {
  await del(photoKey(photoId));
}

export async function totalPhotoBytes() {
  const allKeys = await keys();
  let total = 0;
  for (const k of allKeys) {
    if (typeof k === 'string' && k.startsWith('photo:')) {
      const blob = await get<Blob>(k);
      if (blob) total += blob.size;
    }
  }
  return total;
}

function photoKey(id: string) {
  return `photo:${id}`;
}

async function downscaleImage(file: File): Promise<Blob> {
  // SVG / non-raster: store as-is.
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') {
    return file;
  }
  const bitmap = await createBitmap(file);
  const { width, height } = fit(bitmap.width, bitmap.height, MAX_EDGE);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY)
  );
  return blob ?? file;
}

async function createBitmap(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if ('createImageBitmap' in window) {
    try {
      return await createImageBitmap(file);
    } catch {
      // fall through to <img>
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    await img.decode();
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function fit(w: number, h: number, maxEdge: number) {
  if (w <= maxEdge && h <= maxEdge) return { width: w, height: h };
  if (w >= h) {
    const scale = maxEdge / w;
    return { width: maxEdge, height: Math.round(h * scale) };
  }
  const scale = maxEdge / h;
  return { width: Math.round(w * scale), height: maxEdge };
}
