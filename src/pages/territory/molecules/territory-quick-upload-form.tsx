import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Skeleton from '@mui/material/Skeleton';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import FormProvider, { RHFOutletUpload } from '../../../components/hook-form';
import { UploadTerritoryTemplateSchema } from '../schemas';
import { downloadFile } from '../../../utils/file-download';
import Typography from '@mui/material/Typography';
import { TerritoryService } from '../../../services/territory/territory-service';

type Props = {
  open: boolean;
  onClose: () => void;
};

const isFetching = false;

const defaultValues = {
  file: '',
};

export function TerritoryQuickUploadForm({ open, onClose }: Props) {
  const territoryService = new TerritoryService();

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(UploadTerritoryTemplateSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = methods;

  const handleDownload = useCallback(async () => {
    try {
      const blob = await territoryService.download();
      downloadFile(blob, 'CRC - Territory Template');

      toast.success('Territory template downloaded.');
    } catch (e) {
      console.error(e);
      toast.error('Download Territory template failed. Please try again.');
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const file = data.file as File;

    const uploadFile = () => territoryService.upload(file);

    try {
      await toast.promise(uploadFile, {
        pending: "We are uploading your territory template. Please don't close the browser",
        success: 'Upload territory success!',
        error: {
          autoClose: false,
          render({ data }: { data: any }) {
            if (data.error === 'Bad Request') {
              if (Array.isArray(data.message)) {
                return (
                  <Stack gap={1}>
                    <Typography variant="body2" fontWeight="bold">
                      Upload territory failed.
                    </Typography>
                    {data.message.map((error: any, index: number) => {
                      return (
                        <Typography
                          key={index}
                          variant="body2"
                        >{`${index + 1}. ${error}`}</Typography>
                      );
                    })}
                  </Stack>
                );
              }
              return (
                <Stack>
                  <Typography variant="body2" fontWeight="bold">
                    Upload territory failed.
                  </Typography>
                  <Typography variant="body2">Reason: {data.message}</Typography>
                </Stack>
              );
            }

            return (
              <Typography variant="body2">Upload territory failed. Please try again.</Typography>
            );
          },
        },
      });

      reset();
      onClose();
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Upload Territory</DialogTitle>

        {isFetching ? (
          <Box sx={{ p: 2, pt: 0 }}>
            <Skeleton sx={{ width: 1, height: 150 }} />
          </Box>
        ) : (
          <>
            <DialogContent>
              <Stack gap={1}>
                <RHFOutletUpload
                  multiple={false}
                  name="file"
                  accept={{
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
                  }}
                  dropzonePlaceholder="Drop territory template here or click to browse through your device."
                  onDelete={() => {
                    setValue('file', '');
                  }}
                />
                <Button
                  onClick={handleDownload}
                  variant="text"
                  sx={{ alignSelf: 'flex-end', fontWeight: 400, color: 'success.dark' }}
                >
                  Download territory template
                </Button>
              </Stack>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Upload
              </LoadingButton>
            </DialogActions>
          </>
        )}
      </FormProvider>
    </Dialog>
  );
}
