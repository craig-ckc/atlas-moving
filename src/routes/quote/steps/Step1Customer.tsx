import { Controller, useFormContext } from 'react-hook-form';
import { Field } from '@/components/ui/Field';
import { TextInput } from '@/components/ui/TextInput';
import { RadioCardGroup } from '@/components/ui/RadioCardGroup';
import { CONTACT_METHODS } from '@/data/inventory';
import type { QuoteDraftValues } from '@/lib/schema/quote';

export function Step1Customer() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<QuoteDraftValues>();

  return (
    <>
      <Field
        label="Full name"
        required
        error={errors.customer?.fullName?.message}
      >
        <TextInput
          placeholder="Sam Rivera"
          autoComplete="name"
          invalid={!!errors.customer?.fullName}
          {...register('customer.fullName')}
        />
      </Field>

      <Field
        label="Phone number"
        description="Best number for the moving coordinator."
        required
        error={errors.customer?.phone?.message}
      >
        <TextInput
          type="tel"
          placeholder="+1 555 123 4567"
          autoComplete="tel"
          invalid={!!errors.customer?.phone}
          {...register('customer.phone')}
        />
      </Field>

      <Field
        label="Alternative number"
        description="Optional — a backup contact."
        error={errors.customer?.altPhone?.message}
      >
        <TextInput
          type="tel"
          placeholder="Optional"
          autoComplete="tel"
          {...register('customer.altPhone')}
        />
      </Field>

      <Field
        label="Email"
        required
        error={errors.customer?.email?.message}
      >
        <TextInput
          type="email"
          placeholder="you@email.com"
          autoComplete="email"
          invalid={!!errors.customer?.email}
          {...register('customer.email')}
        />
      </Field>

      <Field
        label="Preferred contact"
        description="How should we send your quote?"
        required
      >
        <Controller
          control={control}
          name="customer.preferredContact"
          render={({ field }) => (
            <RadioCardGroup
              value={field.value}
              onValueChange={field.onChange}
              options={CONTACT_METHODS.map((m) => ({ value: m.key, label: m.label }))}
              columns={3}
              variant="card"
            />
          )}
        />
      </Field>
    </>
  );
}
