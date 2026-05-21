import { Controller, useFormContext } from 'react-hook-form';
import { Field } from '@/components/ui/Field';
import { RadioCardGroup } from '@/components/ui/RadioCardGroup';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';
import {
  ADDITIONAL_SERVICES,
  CLEANING_OPTIONS,
  PACKING_EXTRAS,
  PACKING_OPTIONS,
  UNPACKING_OPTIONS,
} from '@/data/inventory';
import type { QuoteDraftValues } from '@/lib/schema/quote';

export function Step6Services() {
  const { control } = useFormContext<QuoteDraftValues>();
  return (
    <>
      <Field label="Packing" required layout="stacked" description="What packing help do you need?">
        <Controller
          control={control}
          name="services.packing"
          render={({ field }) => (
            <RadioCardGroup
              value={field.value}
              onValueChange={field.onChange}
              options={PACKING_OPTIONS.map((p) => ({
                value: p.key,
                label: p.label,
                description: p.desc,
              }))}
              columns={3}
              variant="card"
            />
          )}
        />
      </Field>

      <Field label="Packing extras" layout="stacked" description="Optional — add specific materials.">
        <Controller
          control={control}
          name="services.packingExtras"
          render={({ field }) => (
            <CheckboxGroup
              values={field.value}
              onChange={field.onChange}
              options={PACKING_EXTRAS.map((p) => ({ value: p.key, label: p.label }))}
              variant="chip"
            />
          )}
        />
      </Field>

      <div className="hairline" />

      <Field
        label="Unloading & setup"
        layout="stacked"
        description="Pick what you want at the new place."
      >
        <Controller
          control={control}
          name="services.unpacking"
          render={({ field }) => (
            <CheckboxGroup
              values={field.value}
              onChange={(v) => field.onChange(v as ('unload' | 'unpack' | 'arrange' | 'full-setup')[])}
              options={UNPACKING_OPTIONS.map((u) => ({
                value: u.key,
                label: u.label,
                description: u.desc,
              }))}
              columns={2}
              variant="card"
            />
          )}
        />
      </Field>

      <Field label="Cleaning" layout="stacked" description="Move-in and move-out cleans on request.">
        <Controller
          control={control}
          name="services.cleaning"
          render={({ field }) => (
            <RadioCardGroup
              value={field.value}
              onValueChange={field.onChange}
              options={CLEANING_OPTIONS.map((c) => ({
                value: c.key,
                label: c.label,
                description: c.desc,
              }))}
              columns={2}
              variant="card"
            />
          )}
        />
      </Field>

      <div className="hairline" />

      <Field
        label="Additional services"
        layout="stacked"
        description="Anything else? Choose all that apply."
      >
        <Controller
          control={control}
          name="services.additional"
          render={({ field }) => (
            <CheckboxGroup
              values={field.value}
              onChange={field.onChange}
              options={ADDITIONAL_SERVICES.map((s) => ({ value: s.key, label: s.label }))}
              variant="chip"
            />
          )}
        />
      </Field>
    </>
  );
}
