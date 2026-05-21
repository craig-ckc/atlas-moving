import { Controller, useFormContext } from 'react-hook-form';
import { Field } from '@/components/ui/Field';
import { TextArea } from '@/components/ui/TextInput';
import { PhotoUpload } from '@/components/ui/PhotoUpload';
import type { QuoteDraftValues } from '@/lib/schema/quote';

export function Step7Details() {
  const { control } = useFormContext<QuoteDraftValues>();
  return (
    <>
      <Field
        label="Anything we should know?"
        description="Access instructions, narrow stairs, building rules, parking quirks — anything that helps."
        layout="stacked"
      >
        <Controller
          control={control}
          name="details.specialInstructions"
          render={({ field }) => (
            <TextArea
              rows={5}
              placeholder="Loading bay is on the side of the building, accessed via the back lane. Booking required Monday-Friday."
              value={field.value ?? ''}
              onChange={field.onChange}
            />
          )}
        />
      </Field>

      <div className="hairline" />

      <Field
        label="Photos"
        description="Optional but highly recommended — a few photos make the quote 10× more accurate."
        layout="stacked"
      >
        <Controller
          control={control}
          name="details.photos"
          render={({ field }) => <PhotoUpload value={field.value} onChange={field.onChange} />}
        />
      </Field>
    </>
  );
}
