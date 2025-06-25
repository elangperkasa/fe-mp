import { useFormContext, Controller } from 'react-hook-form';
// @mui
import FormHelperText from '@mui/material/FormHelperText';
//
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { UploadAvatar, Upload, UploadBox, UploadProps } from '../upload';

// ----------------------------------------------------------------------

interface Props extends Omit<UploadProps, 'file'> {
  name: string;
  multiple?: boolean;
  label?: string;
  required?: boolean;
  dropzonePlaceholder?: string;
}

// ----------------------------------------------------------------------

export function RHFUploadAvatar({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <UploadAvatar error={!!error} file={field.value} {...other} />

          {!!error && (
            <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUploadBox({ name, ...other }: Props) {
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

// ----------------------------------------------------------------------

export function RHFUpload({ name, multiple, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        multiple ? (
          <Upload
            multiple
            accept={{ 'image/*': [] }}
            files={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        ) : (
          <Upload
            accept={{ 'csv/*': [] }}
            files={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        )
      }
    />
  );
}

export function RHFOutletUpload({
  name,
  required,
  label,
  multiple,
  helperText,
  accept,
  dropzonePlaceholder,
  ...other
}: Props) {
  const theme = useTheme();
  const { control, setValue } = useFormContext();

  return (
    <Stack direction="column" gap={1}>
      <Typography variant="body2" fontWeight={700} sx={{ color: theme.palette.grey['600'] }}>
        {label}{' '}
        {required && (
          <Box component="span" sx={{ color: theme.palette.error.dark }}>
            *
          </Box>
        )}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const uploadProps = {
            multiple,
            accept: accept || { 'image/*': [] },
            error: !!error,
            helperText: error?.message ?? helperText,
          };

          const onDrop = (acceptedFiles: File[]) => {
            const value = multiple ? [...field.value, ...acceptedFiles] : acceptedFiles[0];

            setValue(name, value, { shouldValidate: true });
          };

          return (
            <Upload
              {...uploadProps}
              value={field.value}
              onDrop={onDrop}
              {...other}
              dropzonePlaceholder={dropzonePlaceholder}
            />
          );
        }}
      />
    </Stack>
  );
}
