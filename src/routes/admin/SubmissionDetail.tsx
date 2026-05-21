import { useEffect, useState } from 'react';
import { Tabs } from '@base-ui/react/tabs';
import {
  Calendar,
  Home,
  Image as ImageIcon,
  Mail,
  MapPin,
  MessageSquareText,
  MessageCircle,
  Package,
  Phone,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { useSubmissionsStore } from '@/state/submissionsStore';
import type { Submission, SubmissionStatus } from '@/lib/schema/quote';
import { Badge, STATUS_LABELS, StatusBadge } from '@/components/ui/Badge';
import { TextArea } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { formatDate, formatRelative, shortId } from '@/lib/format';
import {
  BUILDING_TYPES,
  CONTACT_METHODS,
  FRAGILE_ITEMS,
  FURNITURE,
  PROPERTY_TYPES,
  QUOTATION_OPTIONS,
} from '@/data/inventory';
import { loadPhotoURL } from '@/lib/storage/photos';
import { cn } from '@/lib/cn';

const STATUS_OPTIONS: { value: SubmissionStatus; label: string }[] = (
  Object.keys(STATUS_LABELS) as SubmissionStatus[]
).map((s) => ({ value: s, label: STATUS_LABELS[s] }));

export function SubmissionDetail({ submission }: { submission: Submission }) {
  const updateStatus = useSubmissionsStore((s) => s.updateStatus);
  const addNote = useSubmissionsStore((s) => s.addNote);
  const deleteNote = useSubmissionsStore((s) => s.deleteNote);

  const [noteDraft, setNoteDraft] = useState('');

  const { data, id } = submission;

  const property = PROPERTY_TYPES.find((p) => p.key === data.schedule.propertyType);
  const contact = CONTACT_METHODS.find((c) => c.key === data.customer.preferredContact);
  const quotation = QUOTATION_OPTIONS.find((q) => q.key === data.quotation.type);
  const ContactIcon = data.customer.preferredContact === 'call' ? Phone : data.customer.preferredContact === 'whatsapp' ? MessageCircle : Mail;

  const furniture = Object.entries(data.inventory.furniture)
    .filter(([, q]) => q > 0)
    .map(([k, qty]) => ({
      label: FURNITURE.find((f) => f.key === k)?.label ?? k,
      qty,
    }));
  const fragile = data.inventory.fragileItems.map(
    (k) => FRAGILE_ITEMS.find((f) => f.key === k)?.label ?? k
  );

  return (
    <Tabs.Root defaultValue="overview" className="flex h-full flex-col">
      <div className="border-b border-slate-200/70 bg-white/85 px-5 py-5 backdrop-blur md:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="font-mono tracking-tight">{shortId(id)}</span>
              <span>•</span>
              <span>Submitted {formatDate(submission.createdAt, { dateStyle: 'medium', timeStyle: 'short' })}</span>
            </div>
            <h1 className="mt-1 truncate text-xl font-semibold tracking-tight text-slate-900">
              {data.customer.fullName || 'Unnamed customer'}
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <a
                href={`mailto:${data.customer.email}`}
                className="inline-flex items-center gap-1 hover:text-brand-700"
              >
                <Mail className="h-3.5 w-3.5" /> {data.customer.email}
              </a>
              <span className="text-slate-300">•</span>
              <a
                href={`tel:${data.customer.phone}`}
                className="inline-flex items-center gap-1 hover:text-brand-700"
              >
                <Phone className="h-3.5 w-3.5" /> {data.customer.phone}
              </a>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1 text-slate-600">
                <ContactIcon className="h-3.5 w-3.5" /> Prefers {contact?.label?.toLowerCase()}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <StatusBadge status={submission.status} />
            <div className="w-[140px]">
              <Select
                value={submission.status}
                onValueChange={(v) => updateStatus(id, v as SubmissionStatus)}
                options={STATUS_OPTIONS}
                className="!h-9 !text-sm"
              />
            </div>
          </div>
        </div>

        <Tabs.List className="mt-5 flex items-center gap-1 -mb-5 border-b border-transparent">
          {[
            { value: 'overview', label: 'Overview', icon: Home },
            { value: 'items', label: 'Inventory', icon: Package },
            { value: 'photos', label: `Photos (${data.details.photos.length})`, icon: ImageIcon },
            { value: 'notes', label: `Notes (${submission.notes.length})`, icon: MessageSquareText },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <Tabs.Tab
                key={t.value}
                value={t.value}
                className={cn(
                  'group inline-flex items-center gap-1.5 border-b-2 border-transparent px-3 py-2.5 text-sm text-slate-500 cursor-pointer',
                  'hover:text-slate-900',
                  'data-[selected]:border-brand-600 data-[selected]:text-slate-900 data-[selected]:font-medium'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {t.label}
              </Tabs.Tab>
            );
          })}
        </Tabs.List>
      </div>

      <div className="min-w-0 flex-1 px-5 py-6 md:px-8">
        <Tabs.Panel value="overview" className="outline-none">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <DetailCard title="Schedule" icon={Calendar}>
              <Row label="Date">{formatDate(data.schedule.date, { dateStyle: 'full' })}</Row>
              <Row label="Time">{data.schedule.time}</Row>
              <Row label="Flexible">{data.schedule.flexible ? 'Yes' : 'No'}</Row>
              <Row label="Move type">{property?.label}</Row>
              <Row label="Quote type">{quotation?.label}</Row>
            </DetailCard>

            <DetailCard title="Origin" icon={MapPin}>
              <Row label="Address">{data.origin.address}</Row>
              <Row label="Suburb">{data.origin.suburb}</Row>
              {data.origin.floor && <Row label="Floor">{data.origin.floor}</Row>}
              <Row label="Building">
                {BUILDING_TYPES.find((b) => b.key === data.origin.buildingType)?.label}
                {data.origin.otherBuilding ? ` — ${data.origin.otherBuilding}` : ''}
              </Row>
              <Row label="Elevator">{data.origin.hasElevator ? 'Yes' : 'No'}</Row>
              <Row label="Stairs">
                {data.origin.hasStairs
                  ? `${data.origin.flightsOfStairs} flight${data.origin.flightsOfStairs === 1 ? '' : 's'}`
                  : 'None'}
              </Row>
              <Row label="Parking">{data.origin.parkingAvailable ? 'Available' : 'Not available'}</Row>
            </DetailCard>

            <DetailCard title="Destination" icon={MapPin}>
              <Row label="Address">{data.destination.address}</Row>
              <Row label="Suburb">{data.destination.suburb}</Row>
              {data.destination.floor && <Row label="Floor">{data.destination.floor}</Row>}
              <Row label="Building">
                {BUILDING_TYPES.find((b) => b.key === data.destination.buildingType)?.label}
                {data.destination.otherBuilding ? ` — ${data.destination.otherBuilding}` : ''}
              </Row>
              <Row label="Elevator">{data.destination.hasElevator ? 'Yes' : 'No'}</Row>
              <Row label="Stairs">
                {data.destination.hasStairs
                  ? `${data.destination.flightsOfStairs} flight${data.destination.flightsOfStairs === 1 ? '' : 's'}`
                  : 'None'}
              </Row>
              <Row label="Parking">
                {data.destination.parkingAvailable ? 'Available' : 'Not available'}
              </Row>
            </DetailCard>

            <DetailCard title="Services" icon={Sparkles}>
              <Row label="Packing">{data.services.packing}</Row>
              {data.services.packingExtras.length > 0 && (
                <Row label="Extras">{data.services.packingExtras.join(', ')}</Row>
              )}
              {data.services.unpacking.length > 0 && (
                <Row label="At destination">{data.services.unpacking.join(', ')}</Row>
              )}
              <Row label="Cleaning">{data.services.cleaning}</Row>
              {data.services.additional.length > 0 && (
                <Row label="Other">{data.services.additional.join(', ')}</Row>
              )}
            </DetailCard>
          </div>

          {data.details.specialInstructions && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Customer notes
              </div>
              <p className="whitespace-pre-wrap text-sm text-slate-800">
                {data.details.specialInstructions}
              </p>
            </div>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="items" className="outline-none">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <DetailCard title={`Large items (${furniture.length})`} icon={Package}>
              {furniture.length === 0 ? (
                <p className="text-sm text-slate-500">No items listed.</p>
              ) : (
                <ul className="flex flex-col divide-y divide-slate-200/70">
                  {furniture.map((f) => (
                    <li key={f.label} className="flex items-center justify-between py-2 text-sm">
                      <span className="text-slate-800">{f.label}</span>
                      <Badge tone="slate">×{f.qty}</Badge>
                    </li>
                  ))}
                </ul>
              )}
              {data.inventory.otherFurniture && (
                <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                  <span className="font-medium">Other:</span> {data.inventory.otherFurniture}
                </div>
              )}
            </DetailCard>

            <DetailCard title={`Fragile (${fragile.length})`} icon={Sparkles}>
              {fragile.length === 0 ? (
                <p className="text-sm text-slate-500">No fragile items flagged.</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {fragile.map((f) => (
                    <Badge key={f} tone="amber">
                      {f}
                    </Badge>
                  ))}
                </div>
              )}
              {data.inventory.fragileNotes && (
                <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                  <span className="font-medium">Notes:</span> {data.inventory.fragileNotes}
                </div>
              )}
            </DetailCard>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="photos" className="outline-none">
          {data.details.photos.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <ImageIcon className="mx-auto h-6 w-6 text-slate-400" />
              <p className="mt-2 text-sm text-slate-500">No photos uploaded.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {data.details.photos.map((p) => (
                <PhotoTile key={p.photoId} photoId={p.photoId} name={p.name} />
              ))}
            </div>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="notes" className="outline-none">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <TextArea
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              rows={3}
              placeholder="Add an internal note — visible to the team only."
            />
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-slate-500">Notes are stored locally, on this device.</p>
              <Button
                size="sm"
                disabled={!noteDraft.trim()}
                onClick={() => {
                  addNote(id, noteDraft.trim());
                  setNoteDraft('');
                }}
              >
                Add note
              </Button>
            </div>
          </div>

          {submission.notes.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
              No notes yet.
            </div>
          ) : (
            <ul className="mt-4 flex flex-col gap-2">
              {[...submission.notes].reverse().map((n) => (
                <li
                  key={n.id}
                  className="group rounded-xl border border-slate-200 bg-white p-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="whitespace-pre-wrap text-sm text-slate-800">{n.body}</p>
                    <button
                      onClick={() => deleteNote(id, n.id)}
                      className="opacity-0 transition group-hover:opacity-100 cursor-pointer text-slate-400 hover:text-rose-600"
                      aria-label="Delete note"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-1.5 text-[11px] text-slate-400">{formatRelative(n.at)}</div>
                </li>
              ))}
            </ul>
          )}
        </Tabs.Panel>
      </div>
    </Tabs.Root>
  );
}

function DetailCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-brand-50 text-brand-700">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children?: React.ReactNode }) {
  if (children == null || children === '') return null;
  return (
    <div className="grid grid-cols-[100px_minmax(0,1fr)] gap-3 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-900">{children}</span>
    </div>
  );
}

function PhotoTile({ photoId, name }: { photoId: string; name: string }) {
  const [url, setUrl] = useState<string | undefined>();
  useEffect(() => {
    let revoke: string | undefined;
    loadPhotoURL(photoId).then((u) => {
      revoke = u;
      setUrl(u);
    });
    return () => {
      if (revoke) URL.revokeObjectURL(revoke);
    };
  }, [photoId]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group relative block aspect-square overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200/70 transition hover:ring-brand-300"
    >
      {url ? (
        <img src={url} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full animate-pulse bg-slate-200" />
      )}
      <div className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/70 to-transparent px-2 py-1 text-[10px] text-white/90">
        {name}
      </div>
    </a>
  );
}
