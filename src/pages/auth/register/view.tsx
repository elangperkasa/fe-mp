import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/pages/paths';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { toast } from 'react-toastify';
import { endpoints } from 'src/utils/endpoints';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const [errorMsg, setErrorMsg] = useState('');

  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const password = useBoolean();
  const rePassword = useBoolean();

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name required'),
    phoneNumber: Yup.string().required('Last name required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    emailManager: Yup.string()
      .required('Manager Email is required')
      .email('Manager Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    rePassword: Yup.string()
      .required('Re-Type Password is required')
      .oneOf([Yup.ref('password')], 'Passwords & Re-Type Password must match'),
  });

  const defaultValues = {
    fullName: '',
    phoneNumber: '',
    email: '',
    emailManager: '',
    password: '',
    rePassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axiosInstance.post(`${endpoints.auth.register}`, data, {});

      toast.success(
        `Create Account Success! You're manager need to approve your account! Stay Tuned!'`
      );
      setIsSubmitSuccess(true);
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mt: { lg: -15 }, mb: 5, position: 'relative' }}>
      <Typography variant="h4">Get started your account!</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        mb: 5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderAfter = (
    <Stack spacing={2.5}>
      <Alert severity="info">
        You&apos;re account already created! <br />
        Please ask your manager to approve your email.
      </Alert>

      <Link component={RouterLink} href={paths.auth.login} variant="subtitle2">
        Back To Login
      </Link>
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <RHFTextField name="fullName" label="Full name" />
        <RHFTextField name="phoneNumber" label="Phone Number" />
        <RHFTextField name="email" label="Email address" />
        <RHFTextField
          name="emailManager"
          label="Manager Email address"
          helperText="Your manager email should be valid!"
        />

        <RHFTextField
          name="password"
          label="Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="rePassword"
          label="Re-Type Password"
          type={rePassword.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={rePassword.onToggle} edge="end">
                  <Iconify icon={rePassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Create account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {isSubmitSuccess ? renderAfter : renderForm}
      {!isSubmitSuccess && renderTerms}
    </>
  );
}
