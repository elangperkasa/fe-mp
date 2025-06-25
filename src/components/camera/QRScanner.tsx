import { QrCodeScanner } from '@mui/icons-material';
import { Card, Dialog, IconButton, SxProps, Tooltip, Typography } from '@mui/material';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';

export function ButtomOpenQRScanner({
  onScan,
  sx,
}: {
  onScan: (res: string) => void;
  sx?: SxProps;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnScan = (res: any) => {
    onScan(res[0].rawValue);
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Open Scanner">
        <IconButton onClick={handleOpen} sx={{ ...sx, px: 2 }}>
          <QrCodeScanner sx={{ width: 18, mr: 1 }} />
          <Typography variant="body2">Klik Untuk Scan</Typography>
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Card>
          <Scanner onScan={(result) => handleOnScan(result)} />
        </Card>
      </Dialog>
    </>
  );
}
