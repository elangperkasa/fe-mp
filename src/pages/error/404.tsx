import { Helmet } from 'react-helmet-async';
import { MotionContainer, varBounce } from 'src/components/animate';
// sections
import { Button, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { PageNotFoundIllustration } from 'src/assets/illustrations';
import { RouterLink } from 'src/components/router-link';

// ----------------------------------------------------------------------

export default function View404() {
  return (
    <Stack
      sx={{
        mx: 'auto',
        maxWidth: 400,
        minHeight: '80vh',
        textAlign: 'center',
        justifyContent: 'center',
      }}
    >
      <Helmet>
        <title> 404 Page Not Found!</title>
      </Helmet>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Sorry, Page Not Found!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained">
          Go to Home
        </Button>
      </MotionContainer>
    </Stack>
  );
}
