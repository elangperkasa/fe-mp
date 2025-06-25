import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { UploadIllustration } from 'src/assets/illustrations';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  dropzonePlaceholder?: string;
};

export function UploadPlaceholder({ sx, dropzonePlaceholder, ...other }: Props) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      sx={sx}
      {...other}
    >
      <UploadIllustration sx={{ width: 200 }} />

      <Stack spacing={1} sx={{ textAlign: 'center' }}>
        <Box sx={{ typography: 'h6' }}>Drop or select file</Box>
        <Box sx={{ typography: 'body2', color: 'text.secondary' }}>
          {dropzonePlaceholder ||
            'You can upload up to 3 files, with each file being a maximum 10MB.'}
        </Box>
      </Stack>
    </Box>
  );
}
