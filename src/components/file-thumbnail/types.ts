// ----------------------------------------------------------------------

import { BoxProps } from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

export interface ExtendFile extends File {
  preview?: string;
  path?: string;
  lastModifiedDate?: string;
}

export type FileThumbnailProps = BoxProps & {
  tooltip?: boolean;
  file: File | string;
  imageView?: boolean;
  sx?: SxProps<Theme>;
  onDownload?: () => void;
  onRemove?: () => void;
  slotProps?: {
    img?: SxProps<Theme>;
    icon?: SxProps<Theme>;
    removeBtn?: SxProps<Theme>;
    downloadBtn?: SxProps<Theme>;
  };
};
