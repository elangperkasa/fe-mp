import type { TextFieldProps } from '@mui/material/TextField';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { MobileDateTimePickerProps } from '@mui/x-date-pickers/MobileDateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { Controller, useFormContext } from 'react-hook-form';
import { format, parse } from 'date-fns';

const DATE_FORMAT = 'dd-MM-yyyy';

type RHFDatePickerProps = DatePickerProps<Date> & {
  name: string;
};

export function RHFDatePicker({ name, slotProps, ...other }: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          value={field.value ? parse(field.value, DATE_FORMAT, new Date()) : null}
          onChange={(newValue) => {
            if (newValue) {
              field.onChange(format(newValue, DATE_FORMAT));
            } else {
              field.onChange(null);
            }
          }}
          format={DATE_FORMAT}
          slotProps={{
            ...slotProps,
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message ?? (slotProps?.textField as TextFieldProps)?.helperText,
              ...slotProps?.textField,
            },
          }}
          {...other}
        />
      )}
    />
  );
}

// ----------------------------------------------------------------------

type RHFMobileDateTimePickerProps = MobileDateTimePickerProps<Date> & {
  name: string;
};

export function RHFMobileDateTimePicker({
  name,
  slotProps,
  ...other
}: RHFMobileDateTimePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MobileDateTimePicker
          {...field}
          value={field.value ? parse(field.value, DATE_FORMAT, new Date()) : null}
          onChange={(newValue) => {
            if (newValue) {
              field.onChange(format(newValue, DATE_FORMAT));
            } else {
              field.onChange(null);
            }
          }}
          format={DATE_FORMAT}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message ?? (slotProps?.textField as TextFieldProps)?.helperText,
              ...slotProps?.textField,
            },
            ...slotProps,
          }}
          {...other}
        />
      )}
    />
  );
}
