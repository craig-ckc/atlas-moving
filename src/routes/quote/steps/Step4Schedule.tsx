import { Controller, useFormContext } from 'react-hook-form';
import { Field } from '@/components/ui/Field';
import { DatePicker } from '@/components/ui/DatePicker';
import { Select } from '@/components/ui/Select';
import { SegmentedYesNo } from '@/components/ui/SegmentedYesNo';
import { RadioCardGroup } from '@/components/ui/RadioCardGroup';
import { PROPERTY_TYPES } from '@/data/inventory';
import type { QuoteDraftValues } from '@/lib/schema/quote';

const TIME_OPTIONS = [
  { value: '07:00', label: '7:00 AM (early)' },
  { value: '09:00', label: '9:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '17:00', label: '5:00 PM' },
];

export function Step4Schedule() {
  const {
    control,
    formState: { errors },
  } = useFormContext<QuoteDraftValues>();

  return (
    <>
      <Field label="Moving date" required error={errors.schedule?.date?.message}>
        <Controller
          control={control}
          name="schedule.date"
          render={({ field }) => (
            <DatePicker
              value={field.value}
              onChange={field.onChange}
              minDate={new Date()}
              invalid={!!errors.schedule?.date}
            />
          )}
        />
      </Field>

      <Field label="Preferred time" required error={errors.schedule?.time?.message}>
        <Controller
          control={control}
          name="schedule.time"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              options={TIME_OPTIONS}
              placeholder="Pick a time window"
              invalid={!!errors.schedule?.time}
            />
          )}
        />
      </Field>

      <Field
        label="Flexible on date?"
        description="A flexible day usually means a lower price."
        required
      >
        <Controller
          control={control}
          name="schedule.flexible"
          render={({ field }) => (
            <SegmentedYesNo value={field.value} onChange={field.onChange} ariaLabel="Flexible date" />
          )}
        />
      </Field>

      <div className="hairline" />

      <Field
        label="What's the size of the move?"
        description="Pick the closest match — we'll refine on quote."
        required
      >
        <Controller
          control={control}
          name="schedule.propertyType"
          render={({ field }) => (
            <RadioCardGroup
              value={field.value}
              onValueChange={field.onChange}
              options={PROPERTY_TYPES.map((p) => ({
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
    </>
  );
}
