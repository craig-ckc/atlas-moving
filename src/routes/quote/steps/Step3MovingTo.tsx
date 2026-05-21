import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Field } from '@/components/ui/Field';
import { CheckboxBox } from '@/components/ui/CheckboxGroup';
import { AddressFields } from './AddressFields';
import type { QuoteDraftValues } from '@/lib/schema/quote';

export function Step3MovingTo() {
  const { control, setValue, getValues } = useFormContext<QuoteDraftValues>();
  const sameAsOrigin = useWatch({ control, name: 'sameAsOrigin' }) as boolean | undefined;

  const copyFromOrigin = () => {
    const origin = getValues('origin');
    setValue('destination', { ...origin }, { shouldValidate: false, shouldDirty: true });
  };

  return (
    <>
      <Field label="Quick fill" description="Use the same address as the pickup.">
        <Controller
          control={control}
          name="sameAsOrigin"
          render={({ field }) => (
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2">
              <CheckboxBox
                checked={!!field.value}
                onCheckedChange={(v) => {
                  field.onChange(v);
                  if (v) copyFromOrigin();
                }}
                ariaLabel="Same as pickup address"
              />
              <span className="text-sm text-slate-700">Same as pickup address</span>
            </label>
          )}
        />
      </Field>

      <div className="hairline" />

      {!sameAsOrigin && <AddressFields which="destination" />}

      {sameAsOrigin && (
        <div className="rounded-lg border border-brand-200 bg-brand-50/60 px-4 py-3 text-sm text-brand-900">
          Using the same address as your pickup. Uncheck above to edit destination details separately.
        </div>
      )}
    </>
  );
}
