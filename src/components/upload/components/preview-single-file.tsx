import type { IconButtonProps } from '@mui/material/IconButton';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from '../../iconify';
import { uploadClasses } from '../classes';

import type { SingleFilePreviewProps } from '../types';
import { fileFormat, fileThumb } from '../../file-thumbnail';

// ----------------------------------------------------------------------

export function SingleFilePreview({ file, sx, className, ...other }: SingleFilePreviewProps) {
  const fileName = typeof file === 'string' ? file : file.name;

  const format = fileFormat(fileName);

  return (
    <Box
      className={uploadClasses.uploadSinglePreview.concat(className ? ` ${className}` : '')}
      sx={{
        p: 1,
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        position: 'absolute',
        ...sx,
      }}
      {...other}
    >
      <Stack justifyContent="center" alignItems="center" gap={2} sx={{ height: 1 }}>
        <Box
          component="img"
          alt={fileName}
          src={fileThumb(format)}
          sx={{
            width: '50px',
            height: '50px',
            borderRadius: 1,
            objectFit: 'cover',
          }}
        />
        <Typography>{fileName}</Typography>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function DeleteButton({ sx, ...other }: IconButtonProps) {
  return (
    <IconButton
      size="small"
      sx={{
        top: 16,
        right: 16,
        zIndex: 9,
        position: 'absolute',
        color: (theme) => alpha(theme.palette.common.white, 0.8),
        bgcolor: (theme) => alpha(theme.palette.grey['900'], 0.72),
        '&:hover': { bgcolor: (theme) => alpha(theme.palette.grey['900'], 0.48) },
        ...sx,
      }}
      {...other}
    >
      <Iconify icon="mingcute:close-line" width={18} />
    </IconButton>
  );
}
