import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom'

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from 'assets/images/icons/social-google.svg';
import { useCookies } from 'react-cookie';
import { signInApi } from 'apis/index';
import { useDispatch } from 'react-redux';
import {loginSuccess} from '../../../../store/actions';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [cookie, setCookies] = useCookies(); // eslint-disable-line no-unused-vars
  const member = useSelector((state) => state.member); // Redux 상태를 컴포넌트 상단에서 가져옴

  const signInHandler = async () => {
    if (userId.length === 0 || userPassword.length === 0) {
      alert('ID와 Password를 입력하세요.');
      return;
    }
    const data = {
      userId,
      userPassword,
    };

    try {
      const signInResponse = await signInApi(data);

      if (!signInResponse) {
        alert('로그인에 실패했습니다.');
        return;
      }

      if (!signInResponse.result) {
        alert('로그인에 실패했습니다.');
        return;
      }

      const { token, exprTime, user } = signInResponse.data; // eslint-disable-line no-unused-vars
      const expires = new Date();
      expires.setMilliseconds(expires.getMilliseconds() + exprTime);

      setCookies('token', token, { expires });

      // dispatch 함수를 호출한 후에 member 상태를 가져옵니다.
      dispatch(loginSuccess(data));

      // member 상태를 확인하고 사용자 정보를 출력합니다.
      if (member) {
        console.log('로그인 성공! 유저 정보:', member);
        alert(data.userId + '님 환영합니다.');
        navigate('/');
      } else {
        console.error('로그인 후 member 상태를 가져오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };
 

  const googleHandler = async () => {
    console.error('Login');
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              disableElevation
              fullWidth
              onClick={googleHandler}
              size="large"
              variant="outlined"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100]
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
              </Box>
              Sign in with Google 
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

            <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${customization.borderRadius}px`
              }}
              disableRipple
              disabled
            >
              OR
            </Button>

            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          userid: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          userid: Yup.string()
          .matches(/^[a-zA-Z0-9_-]+$/, '영문, 숫자, 하이픈, 언더스코어만 입력 가능합니다')
          .min(5, '5자 이상 입력해주세요')
          .max(20, '20자 이하로 입력해주세요')
          .required('ID는 필수 항목입니다'),
          password: Yup.string().max(255).required('Password는 필수 항목입니다')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.userid && errors.userid)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-userid-login">ID</InputLabel>
              <OutlinedInput
                id="outlined-adornment-userid-login"
                type="userid"
                value={values.userid}
                name="userid"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setUserId(e.target.value);
                }}
                label="userid Address / Username"
                inputProps={{}}
              />
              {touched.userid && errors.userid && (
                <FormHelperText error id="standard-weight-helper-text-userid-login">
                  {errors.userid}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setUserPassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Remember me"
              />
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password? 
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary" onClick={signInHandler}>
                  Sign in 
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
