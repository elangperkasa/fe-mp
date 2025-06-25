import { Box, Button, Card, Dialog, IconButton, Tooltip, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Iconify from '../iconify';

export function ButtonOpenWebCapture({
  title,
  onScan,
}: {
  title: string;
  onScan: (res: string) => void;
}) {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnScan = (res: any) => {
    onScan(res);
    setOpen(false);
  };

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      handleOnScan(imageSrc);
    }
  };

  const videoConstraints = {
    facingMode: 'environment',
    height: 1480,
  };

  return (
    <>
      <div
        style={{
          backgroundColor: '#ca1b2d',
          color: 'white',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          height: '53px',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        <Tooltip title="Web Capture">
          <IconButton onClick={handleOpen} sx={{ color: 'black', alignItems: 'right' }}>
            <Typography variant="body2" sx={{ color: 'white' }}>
              {capturedImage === null ? `Ambil ${title}` : `Ambil Ulang ${title}`}
            </Typography>
            <Iconify icon="solar:alt-arrow-right-linear" color="white" />
          </IconButton>
        </Tooltip>
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Card
          sx={{
            border: '2px solid #ca1b2d', // Add 2px red border
          }}
        >
          <Box
            sx={{ position: 'relative', width: '100%', maxHeight: 600, backgroundColor: 'black' }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={{
                width: '100%',
                objectFit: 'cover',
              }}
              videoConstraints={videoConstraints} // Add video constraints for back camera
            />

            {/* Overlayed Image */}
            <Box
              component="img"
              src="/assets/illustrations/bottle_white.png"
              alt="Overlay Image"
              sx={{
                position: 'absolute',
                top: '10%',
                left: '10%',
                width: '80%',
                pointerEvents: 'none',
              }}
            />
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#ca1b2d',
              color: 'white',
              borderRadius: 0,
              display: 'flex',
              alignItems: 'center',
              height: '53px',
              width: '100%',
              justifyContent: 'center',
              marginTop: -1,
            }}
            onClick={capture}
            title="Open WebCam"
          >
            Ambil {title}
          </Button>
        </Card>
      </Dialog>
    </>
  );
}
