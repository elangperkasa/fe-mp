import { Controller, useFormContext } from 'react-hook-form';
import { UploadBox, UploadProps } from '../upload';

interface Props extends Omit<UploadProps, 'file'> {
  name: string;
  multiple?: boolean;
}

export function QRCodeReaderForm({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadBox files={field.value} error={!!error} {...other} />
      )}
    />
  );
}
