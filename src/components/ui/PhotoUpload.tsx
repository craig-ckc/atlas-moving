import * as React from 'react';
import { ImagePlus, X, Loader2 } from 'lucide-react';
import {
  deletePhoto,
  loadPhotoURL,
  PHOTO_SOFT_LIMIT_BYTES,
  savePhoto,
  totalPhotoBytes,
  type StoredPhotoMeta,
} from '@/lib/storage/photos';
import { formatBytes } from '@/lib/format';
import { cn } from '@/lib/cn';

type Props = {
  value: StoredPhotoMeta[];
  onChange: (next: StoredPhotoMeta[]) => void;
};

const MAX_FILES = 12;

export function PhotoUpload({ value, onChange }: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [busy, setBusy] = React.useState(false);
  const [warning, setWarning] = React.useState<string | undefined>();

  const onPick = () => inputRef.current?.click();

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    try {
      const remaining = Math.max(0, MAX_FILES - value.length);
      const list = Array.from(files).slice(0, remaining);
      const saved: StoredPhotoMeta[] = [];
      for (const f of list) {
        const meta = await savePhoto(f);
        saved.push(meta);
      }
      const next = [...value, ...saved];
      onChange(next);
      const total = await totalPhotoBytes();
      if (total > PHOTO_SOFT_LIMIT_BYTES) {
        setWarning(`You're using ${formatBytes(total)} of photo storage — consider removing a few.`);
      } else {
        setWarning(undefined);
      }
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = async (id: string) => {
    await deletePhoto(id);
    onChange(value.filter((v) => v.photoId !== id));
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onPick}
        disabled={busy || value.length >= MAX_FILES}
        className={cn(
          'group flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/60 px-6 py-8 text-center transition cursor-pointer',
          'hover:border-brand-400 hover:bg-brand-50/50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:border-brand-500 focus-visible:ring-4 focus-visible:ring-brand-500/15'
        )}
      >
        {busy ? (
          <Loader2 className="h-5 w-5 animate-spin text-brand-600" />
        ) : (
          <ImagePlus className="h-5 w-5 text-brand-600" />
        )}
        <div>
          <div className="text-sm font-medium text-slate-900">
            {busy ? 'Processing…' : 'Drop photos or click to upload'}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Up to {MAX_FILES} images • we’ll resize automatically
          </div>
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />

      {warning && (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {warning}
        </div>
      )}

      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {value.map((p) => (
            <PhotoThumb key={p.photoId} photo={p} onRemove={() => handleRemove(p.photoId)} />
          ))}
        </div>
      )}
    </div>
  );
}

function PhotoThumb({ photo, onRemove }: { photo: StoredPhotoMeta; onRemove: () => void }) {
  const [url, setUrl] = React.useState<string | undefined>();
  React.useEffect(() => {
    let revoke: string | undefined;
    loadPhotoURL(photo.photoId).then((u) => {
      revoke = u;
      setUrl(u);
    });
    return () => {
      if (revoke) URL.revokeObjectURL(revoke);
    };
  }, [photo.photoId]);

  return (
    <div className="group relative overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200/70 aspect-square">
      {url ? (
        <img src={url} alt={photo.name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
        </div>
      )}
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/70 text-white opacity-0 transition group-hover:opacity-100 hover:bg-slate-900 focus-visible:opacity-100 cursor-pointer"
        aria-label={`Remove ${photo.name}`}
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <div className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/70 to-transparent px-2 py-1 text-[10px] text-white/90">
        {photo.name}
      </div>
    </div>
  );
}
