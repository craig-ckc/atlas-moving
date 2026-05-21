import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Mail, MessageCircle, Phone } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useSubmissionsStore } from '@/state/submissionsStore';
import { CONTACT_METHODS } from '@/data/inventory';
import { shortId, formatDate } from '@/lib/format';

const CONTACT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  call: Phone,
  whatsapp: MessageCircle,
  email: Mail,
};

export function QuoteComplete() {
  const { id } = useParams<{ id: string }>();
  const submission = useSubmissionsStore((s) => s.submissions.find((x) => x.id === id));

  const contactKey = submission?.data?.customer?.preferredContact ?? 'email';
  const ContactIcon = CONTACT_ICONS[contactKey] ?? Mail;
  const contactLabel = CONTACT_METHODS.find((c) => c.key === contactKey)?.label;

  return (
    <div className="min-h-dvh px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <Card className="overflow-hidden">
          <div className="bg-gradient-to-br from-emerald-50 via-white to-brand-50/40 px-8 py-10 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-700 ring-4 ring-emerald-50">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
              You're booked in for review
            </h1>
            <p className="mt-2 text-[15px] text-slate-600 text-balance">
              Thanks{submission?.data?.customer?.fullName ? `, ${submission.data.customer.fullName.split(' ')[0]}` : ''}.
              We'll review the details and reach out within one business day.
            </p>

            {id && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs text-slate-700">
                <span className="font-medium text-slate-500">Reference</span>
                <span className="font-mono tracking-tight text-slate-900">{shortId(id)}</span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200/70 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              What happens next
            </h2>
            <ol className="mt-3 flex flex-col gap-4">
              <Step
                step={1}
                title="We review your request"
                desc="A coordinator looks over the details, photos, and any notes."
              />
              <Step
                step={2}
                title={`We reach out via ${contactLabel?.toLowerCase() ?? 'your preferred method'}`}
                desc={
                  <span className="inline-flex items-center gap-1.5 text-slate-600">
                    <ContactIcon className="h-3.5 w-3.5" />
                    Usually within 24 hours, often much sooner.
                  </span>
                }
              />
              <Step
                step={3}
                title="We confirm a price and date"
                desc="You'll get a written quote you can accept any time."
              />
            </ol>

            {submission?.createdAt && (
              <p className="mt-6 text-center text-xs text-slate-400">
                Submitted {formatDate(submission.createdAt, { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-slate-200/70 bg-slate-50/60 px-6 py-4">
            <Link to="/">
              <Button variant="ghost">Back to home</Button>
            </Link>
            <Link to="/quote">
              <Button variant="secondary">Request another</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Step({
  step,
  title,
  desc,
}: {
  step: number;
  title: string;
  desc: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
        {step}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-slate-900">{title}</div>
        <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
      </div>
    </li>
  );
}
