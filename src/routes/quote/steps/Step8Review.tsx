import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Field } from '@/components/ui/Field';
import { RadioCardGroup } from '@/components/ui/RadioCardGroup';
import { CheckboxBox } from '@/components/ui/CheckboxGroup';
import {
  BUILDING_TYPES,
  CONTACT_METHODS,
  FRAGILE_ITEMS,
  FURNITURE,
  PROPERTY_TYPES,
  QUOTATION_OPTIONS,
} from '@/data/inventory';
import type { QuoteDraftValues } from '@/lib/schema/quote';
import { formatDate } from '@/lib/format';
import { CheckCircle2 } from 'lucide-react';

export function Step8Review() {
  const {
    control,
    formState: { errors },
  } = useFormContext<QuoteDraftValues>();
  const values = useWatch({ control }) as QuoteDraftValues;

  const property = PROPERTY_TYPES.find((p) => p.key === values?.schedule?.propertyType);
  const contact = CONTACT_METHODS.find((c) => c.key === values?.customer?.preferredContact);
  const furniture = Object.entries(values?.inventory?.furniture ?? {})
    .filter(([, qty]) => qty > 0)
    .map(([k, qty]) => ({
      label: FURNITURE.find((f) => f.key === k)?.label ?? k,
      qty,
    }));
  const fragile = (values?.inventory?.fragileItems ?? []).map(
    (k) => FRAGILE_ITEMS.find((f) => f.key === k)?.label ?? k
  );

  return (
    <>
      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <SummaryCard title="Customer">
          <SummaryRow label="Name" value={values?.customer?.fullName} />
          <SummaryRow label="Phone" value={values?.customer?.phone} />
          {values?.customer?.altPhone && (
            <SummaryRow label="Alt phone" value={values.customer.altPhone} />
          )}
          <SummaryRow label="Email" value={values?.customer?.email} />
          <SummaryRow label="Prefers" value={contact?.label} />
        </SummaryCard>

        <SummaryCard title="Schedule">
          <SummaryRow label="Date" value={formatDate(values?.schedule?.date, { dateStyle: 'full' })} />
          <SummaryRow label="Time" value={values?.schedule?.time} />
          <SummaryRow
            label="Flexible"
            value={values?.schedule?.flexible ? 'Yes' : 'No'}
          />
          <SummaryRow label="Move type" value={property?.label} />
        </SummaryCard>

        <SummaryCard title="From">
          <SummaryRow label="Address" value={values?.origin?.address} />
          <SummaryRow label="Area" value={values?.origin?.suburb} />
          {values?.origin?.floor && <SummaryRow label="Floor" value={values.origin.floor} />}
          <SummaryRow
            label="Building"
            value={
              BUILDING_TYPES.find((b) => b.key === values?.origin?.buildingType)?.label
            }
          />
          <SummaryRow
            label="Access"
            value={`${values?.origin?.hasElevator ? 'Elevator' : 'No elevator'}${
              values?.origin?.hasStairs
                ? `, ${values.origin.flightsOfStairs} flight${values.origin.flightsOfStairs === 1 ? '' : 's'}`
                : ''
            }${values?.origin?.parkingAvailable ? ', parking ✓' : ', no parking'}`}
          />
        </SummaryCard>

        <SummaryCard title="To">
          <SummaryRow label="Address" value={values?.destination?.address} />
          <SummaryRow label="Area" value={values?.destination?.suburb} />
          {values?.destination?.floor && (
            <SummaryRow label="Floor" value={values.destination.floor} />
          )}
          <SummaryRow
            label="Building"
            value={
              BUILDING_TYPES.find((b) => b.key === values?.destination?.buildingType)?.label
            }
          />
          <SummaryRow
            label="Access"
            value={`${values?.destination?.hasElevator ? 'Elevator' : 'No elevator'}${
              values?.destination?.hasStairs
                ? `, ${values.destination.flightsOfStairs} flight${values.destination.flightsOfStairs === 1 ? '' : 's'}`
                : ''
            }${values?.destination?.parkingAvailable ? ', parking ✓' : ', no parking'}`}
          />
        </SummaryCard>
      </div>

      <SummaryCard title="Inventory">
        {furniture.length === 0 ? (
          <div className="text-xs text-slate-500">No large items listed.</div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {furniture.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-700"
              >
                <span>{f.label}</span>
                <span className="rounded-full bg-white px-1.5 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-200">
                  ×{f.qty}
                </span>
              </span>
            ))}
          </div>
        )}
        {fragile.length > 0 && (
          <div className="mt-2 text-xs text-slate-500">
            Fragile: <span className="text-slate-800">{fragile.join(', ')}</span>
          </div>
        )}
        {values?.inventory?.otherFurniture && (
          <div className="mt-1 text-xs text-slate-500">
            Other: <span className="text-slate-800">{values.inventory.otherFurniture}</span>
          </div>
        )}
        <div className="mt-2 text-xs text-slate-500">
          Photos: <span className="text-slate-800">{values?.details?.photos?.length ?? 0}</span>
        </div>
      </SummaryCard>

      <SummaryCard title="Services">
        <SummaryRow label="Packing" value={values?.services?.packing} />
        {values?.services?.packingExtras?.length > 0 && (
          <SummaryRow label="Extras" value={values.services.packingExtras.join(', ')} />
        )}
        {values?.services?.unpacking?.length > 0 && (
          <SummaryRow label="At destination" value={values.services.unpacking.join(', ')} />
        )}
        <SummaryRow label="Cleaning" value={values?.services?.cleaning} />
        {values?.services?.additional?.length > 0 && (
          <SummaryRow label="Other" value={values.services.additional.join(', ')} />
        )}
      </SummaryCard>

      <div className="hairline" />

      <Field
        label="How would you like to be quoted?"
        required
        layout="stacked"
      >
        <Controller
          control={control}
          name="quotation.type"
          render={({ field }) => (
            <RadioCardGroup
              value={field.value}
              onValueChange={field.onChange}
              options={QUOTATION_OPTIONS.map((q) => ({
                value: q.key,
                label: q.label,
                description: q.desc,
              }))}
              columns={2}
              variant="card"
            />
          )}
        />
      </Field>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
        <Controller
          control={control}
          name="quotation.confirmAccurate"
          render={({ field }) => (
            <label className="flex cursor-pointer items-start gap-3">
              <CheckboxBox checked={!!field.value} onCheckedChange={field.onChange} />
              <span className="text-sm text-slate-700">
                I confirm that the information I’ve provided is accurate to the best of my knowledge.
              </span>
            </label>
          )}
        />
        {errors.quotation?.confirmAccurate?.message && (
          <div className="ml-8 text-xs text-rose-600">
            {errors.quotation.confirmAccurate.message as string}
          </div>
        )}
        <Controller
          control={control}
          name="quotation.agreeContact"
          render={({ field }) => (
            <label className="flex cursor-pointer items-start gap-3">
              <CheckboxBox checked={!!field.value} onCheckedChange={field.onChange} />
              <span className="text-sm text-slate-700">
                I agree to be contacted about my moving request via my preferred method.
              </span>
            </label>
          )}
        />
        {errors.quotation?.agreeContact?.message && (
          <div className="ml-8 text-xs text-rose-600">
            {errors.quotation.agreeContact.message as string}
          </div>
        )}
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-brand-50/50 px-4 py-3 text-xs text-brand-900">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
        We’ll reach out within one business day with your quote. No spam, ever.
      </div>
    </>
  );
}

function SummaryCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value?: React.ReactNode }) {
  if (value == null || value === '') return null;
  return (
    <div className="grid grid-cols-[minmax(70px,auto)_minmax(0,1fr)] gap-3 text-sm">
      <div className="text-slate-500">{label}</div>
      <div className="text-slate-900">{value}</div>
    </div>
  );
}
