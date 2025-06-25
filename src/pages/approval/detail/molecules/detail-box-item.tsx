import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

type Props = {
  title: string;
  content: string | string[] | number | null | undefined | ReactNode;
  subcontent?: string | null;
  fixedHeight?: boolean;
};

export function DetailsBoxItem({ title, content, subcontent, fixedHeight }: Props) {
  const theme = useTheme();

  const isContentArray = Array.isArray(content);
  const renderableContent = isContentArray ? content.join(', ') : content;

  return (
    <Stack gap={1}>
      <Box
        sx={{
          padding: 1,
          display: 'flex',
          alignItems: 'center',
          height: 'auto',
          borderRadius: 1,
          backgroundColor: theme.palette.background.neutral,
        }}
      >
        <ListItemText
          primary={title}
          secondary={renderableContent || '-'}
          sx={{
            height: fixedHeight
              ? {
                  xs: 'auto',
                  md: '150px',
                }
              : 'auto',
            overflowY: fixedHeight ? 'auto' : 'auto',
          }}
        />
      </Box>
      {subcontent && (
        <Typography variant="caption" sx={{ ml: 'auto' }}>
          {subcontent}
        </Typography>
      )}
    </Stack>
  );
}
