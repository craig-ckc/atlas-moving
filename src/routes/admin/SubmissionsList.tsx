import { useMemo, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { Inbox, Filter, ChevronRight } from 'lucide-react';
import { useSubmissionsStore } from '@/state/submissionsStore';
import { STATUS_LABELS, StatusBadge } from '@/components/ui/Badge';
import { formatRelative, shortId } from '@/lib/format';
import { SUBMISSION_STATUSES, type SubmissionStatus } from '@/lib/schema/quote';
import { SubmissionDetail } from './SubmissionDetail';
import { Select } from '@/components/ui/Select';

type OutletCtx = { search: string };

export function SubmissionsList() {
  const { search } = useOutletContext<OutletCtx>();
  const { id } = useParams<{ id?: string }>();
  const all = useSubmissionsStore((s) => s.submissions);

  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | 'all'>('all');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return all
      .filter((s) => statusFilter === 'all' || s.status === statusFilter)
      .filter((s) => {
        if (!q) return true;
        const hay = [
          s.id,
          s.data.customer.fullName,
          s.data.customer.email,
          s.data.customer.phone,
          s.data.origin.address,
          s.data.destination.address,
          s.data.origin.suburb,
          s.data.destination.suburb,
        ]
          .join(' ')
          .toLowerCase();
        return hay.includes(q);
      });
  }, [all, search, statusFilter]);

  const selected = id ? all.find((x) => x.id === id) : filtered[0];

  return (
    <div className="grid flex-1 lg:grid-cols-[380px_minmax(0,1fr)] lg:grid-rows-1">
      {/* list pane */}
      <div className="border-r border-slate-200/70 bg-white/60 backdrop-blur">
        <div className="sticky top-14 z-10 flex items-center justify-between gap-3 border-b border-slate-200/70 bg-white/85 px-4 py-3 backdrop-blur">
          <div>
            <h1 className="text-sm font-semibold text-slate-900">Submissions</h1>
            <p className="text-xs text-slate-500">
              {filtered.length} {filtered.length === 1 ? 'request' : 'requests'}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <div className="w-[120px]">
              <Select
                value={statusFilter}
                onValueChange={(v) => setStatusFilter(v as SubmissionStatus | 'all')}
                options={[
                  { value: 'all', label: 'All statuses' },
                  ...SUBMISSION_STATUSES.map((s) => ({ value: s, label: STATUS_LABELS[s] })),
                ]}
                className="!h-8 !text-xs !rounded-md"
              />
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyList total={all.length} />
        ) : (
          <ol className="divide-y divide-slate-200/70">
            {filtered.map((s) => {
              const active = selected?.id === s.id;
              return (
                <li key={s.id}>
                  <Link
                    to={`/admin/submissions/${s.id}`}
                    className={[
                      'group block px-4 py-3.5 transition',
                      active ? 'bg-brand-50/70' : 'hover:bg-slate-50/80',
                    ].join(' ')}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-semibold text-slate-900">
                            {s.data.customer.fullName || 'Unnamed'}
                          </span>
                          <StatusBadge status={s.status} />
                        </div>
                        <div className="mt-1 truncate text-xs text-slate-500">
                          {s.data.origin.suburb} → {s.data.destination.suburb}
                        </div>
                        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-400">
                          <span className="font-mono tracking-tight">{shortId(s.id)}</span>
                          <span>•</span>
                          <span>{formatRelative(s.createdAt)}</span>
                        </div>
                      </div>
                      <ChevronRight
                        className={[
                          'h-4 w-4 shrink-0 transition',
                          active ? 'text-brand-600 translate-x-0.5' : 'text-slate-300 group-hover:translate-x-0.5',
                        ].join(' ')}
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        )}
      </div>

      {/* detail pane */}
      <div className="flex min-w-0 flex-col bg-white/40">
        {selected ? (
          <SubmissionDetail submission={selected} />
        ) : (
          <EmptyDetail total={all.length} />
        )}
      </div>
    </div>
  );
}

function EmptyList({ total }: { total: number }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-400">
        <Inbox className="h-5 w-5" />
      </span>
      <p className="mt-3 text-sm font-medium text-slate-700">
        {total === 0 ? 'No submissions yet' : 'No matches'}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        {total === 0
          ? 'New quote requests will appear here as customers complete the form.'
          : 'Try clearing the search or status filter.'}
      </p>
    </div>
  );
}

function EmptyDetail({ total }: { total: number }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-24 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-400">
        <Inbox className="h-6 w-6" />
      </span>
      <p className="mt-4 text-base font-medium text-slate-800">
        {total === 0 ? 'No submissions yet' : 'Select a submission'}
      </p>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        {total === 0
          ? 'When a customer completes the request form, you’ll see it here with all their details, photos, and notes.'
          : 'Pick a request from the list to see customer details, items, photos, and notes.'}
      </p>
      {total === 0 && (
        <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
          Tip: open <span className="font-mono">/quote</span> in another tab to make a test submission
        </div>
      )}
    </div>
  );
}
