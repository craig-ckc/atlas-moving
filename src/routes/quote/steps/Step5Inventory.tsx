import { Controller, useFormContext } from 'react-hook-form';
import { Field } from '@/components/ui/Field';
import { TextArea } from '@/components/ui/TextInput';
import { NumberInput } from '@/components/ui/NumberInput';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';
import { FRAGILE_ITEMS, FURNITURE, FURNITURE_GROUPS } from '@/data/inventory';
import type { QuoteDraftValues } from '@/lib/schema/quote';

export function Step5Inventory() {
  const { control } = useFormContext<QuoteDraftValues>();

  return (
    <>
      <Field
        label="Large furniture"
        description="Tap + for each item you're moving. Skip what you're not bringing."
        layout="stacked"
      >
        <Controller
          control={control}
          name="inventory.furniture"
          render={({ field }) => {
            const value = (field.value ?? {}) as Record<string, number>;
            const setQty = (key: string, qty: number) => {
              const next = { ...value };
              if (qty <= 0) delete next[key];
              else next[key] = qty;
              field.onChange(next);
            };
            return (
              <div className="flex flex-col gap-5">
                {FURNITURE_GROUPS.map((group) => (
                  <div key={group.key}>
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {group.label}
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {FURNITURE.filter((f) => f.group === group.key).map((item) => {
                        const Icon = item.icon;
                        const qty = value[item.key] ?? 0;
                        const active = qty > 0;
                        return (
                          <div
                            key={item.key}
                            className={[
                              'flex items-center justify-between gap-3 rounded-lg border bg-white px-3 py-2 transition',
                              active
                                ? 'border-brand-300 bg-brand-50/30 shadow-sm'
                                : 'border-slate-200 hover:border-slate-300',
                            ].join(' ')}
                          >
                            <div className="flex min-w-0 items-center gap-2.5">
                              <Icon className="h-4 w-4 shrink-0 text-slate-500" />
                              <span className="truncate text-sm text-slate-800">{item.label}</span>
                            </div>
                            <NumberInput
                              value={qty}
                              onValueChange={(v) => setQty(item.key, v ?? 0)}
                              min={0}
                              max={20}
                              ariaLabel={`${item.label} quantity`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            );
          }}
        />
      </Field>

      <Field
        label="Other large items"
        description="Anything we missed? Describe it briefly."
        layout="stacked"
      >
        <Controller
          control={control}
          name="inventory.otherFurniture"
          render={({ field }) => (
            <TextArea
              rows={2}
              placeholder="e.g. large potted plants, treadmill, pool table"
              value={field.value ?? ''}
              onChange={field.onChange}
            />
          )}
        />
      </Field>

      <div className="hairline" />

      <Field
        label="Fragile or valuable items"
        description="We pack these with extra care. Anything checked here gets bubble-wrap by default."
        layout="stacked"
      >
        <Controller
          control={control}
          name="inventory.fragileItems"
          render={({ field }) => (
            <CheckboxGroup
              values={field.value}
              onChange={field.onChange}
              options={FRAGILE_ITEMS.map((f) => ({
                value: f.key,
                label: f.label,
                icon: <f.icon className="h-4 w-4" />,
              }))}
              columns={3}
              variant="card"
            />
          )}
        />
      </Field>

      <Field
        label="Notes about fragile items"
        description="Optional — anything we should know about high-value or irreplaceable pieces."
        layout="stacked"
      >
        <Controller
          control={control}
          name="inventory.fragileNotes"
          render={({ field }) => (
            <TextArea
              rows={3}
              placeholder="e.g. grandmother’s mirror, custom artwork — handle with extra care"
              value={field.value ?? ''}
              onChange={field.onChange}
            />
          )}
        />
      </Field>
    </>
  );
}
