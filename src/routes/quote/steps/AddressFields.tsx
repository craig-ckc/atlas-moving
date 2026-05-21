import { Controller, useFormContext, useWatch, type Path } from 'react-hook-form';
import { Field } from '@/components/ui/Field';
import { TextInput } from '@/components/ui/TextInput';
import { Select } from '@/components/ui/Select';
import { SegmentedYesNo } from '@/components/ui/SegmentedYesNo';
import { NumberInput } from '@/components/ui/NumberInput';
import { BUILDING_TYPES } from '@/data/inventory';
import type { QuoteDraftValues } from '@/lib/schema/quote';

type AddressKey = 'origin' | 'destination';

export function AddressFields({ which }: { which: AddressKey }) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<QuoteDraftValues>();
  const block = errors[which];

  const buildingType = useWatch({ control, name: `${which}.buildingType` as Path<QuoteDraftValues> }) as string;
  const hasStairs = useWatch({ control, name: `${which}.hasStairs` as Path<QuoteDraftValues> }) as boolean;

  return (
    <>
      <Field label="Street address" required error={block?.address?.message}>
        <TextInput
          autoComplete="street-address"
          placeholder="123 Main Street"
          invalid={!!block?.address}
          {...register(`${which}.address` as Path<QuoteDraftValues>)}
        />
      </Field>

      <Field label="Area / suburb" required error={block?.suburb?.message}>
        <TextInput
          placeholder="Downtown"
          invalid={!!block?.suburb}
          {...register(`${which}.suburb` as Path<QuoteDraftValues>)}
        />
      </Field>

      <Field label="Floor / unit" description="Optional — apartment or unit number.">
        <TextInput
          placeholder="e.g. Apt 4B, Floor 3"
          {...register(`${which}.floor` as Path<QuoteDraftValues>)}
        />
      </Field>

      <Field label="Building type" required>
        <Controller
          control={control}
          name={`${which}.buildingType` as Path<QuoteDraftValues>}
          render={({ field }) => (
            <Select
              value={field.value as string}
              onValueChange={(v) => {
                field.onChange(v);
                if (v !== 'other') {
                  setValue(
                    `${which}.otherBuilding` as Path<QuoteDraftValues>,
                    undefined as never
                  );
                }
              }}
              options={BUILDING_TYPES.map((b) => ({ value: b.key, label: b.label }))}
            />
          )}
        />
      </Field>

      {buildingType === 'other' && (
        <Field label="Describe building" required error={block?.otherBuilding?.message}>
          <TextInput
            placeholder="e.g. warehouse, garage"
            invalid={!!block?.otherBuilding}
            {...register(`${which}.otherBuilding` as Path<QuoteDraftValues>)}
          />
        </Field>
      )}

      <div className="hairline" />

      <Field label="Elevator access?" required>
        <Controller
          control={control}
          name={`${which}.hasElevator` as Path<QuoteDraftValues>}
          render={({ field }) => (
            <SegmentedYesNo
              value={field.value as boolean}
              onChange={field.onChange}
              ariaLabel="Elevator available"
            />
          )}
        />
      </Field>

      <Field label="Are there stairs?" required>
        <Controller
          control={control}
          name={`${which}.hasStairs` as Path<QuoteDraftValues>}
          render={({ field }) => (
            <SegmentedYesNo
              value={field.value as boolean}
              onChange={(v) => {
                field.onChange(v);
                if (!v) setValue(`${which}.flightsOfStairs` as Path<QuoteDraftValues>, undefined as never);
              }}
              ariaLabel="Stairs"
            />
          )}
        />
      </Field>

      {hasStairs && (
        <Field label="Flights of stairs" required error={block?.flightsOfStairs?.message}>
          <Controller
            control={control}
            name={`${which}.flightsOfStairs` as Path<QuoteDraftValues>}
            render={({ field }) => (
              <NumberInput
                value={(field.value as number | undefined) ?? 0}
                onValueChange={(v) => field.onChange(v ?? undefined)}
                min={1}
                max={20}
                ariaLabel="Flights of stairs"
              />
            )}
          />
        </Field>
      )}

      <Field
        label="Parking for the truck?"
        description="Can a 9m / 30ft truck stop within ~30 paces of the door?"
        required
      >
        <Controller
          control={control}
          name={`${which}.parkingAvailable` as Path<QuoteDraftValues>}
          render={({ field }) => (
            <SegmentedYesNo
              value={field.value as boolean}
              onChange={field.onChange}
              ariaLabel="Parking available"
            />
          )}
        />
      </Field>
    </>
  );
}
