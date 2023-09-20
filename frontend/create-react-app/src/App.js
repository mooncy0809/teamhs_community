import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store'; // eslint-disable-line no-unused-vars
import Login from './views/pages/authentication/authentication3/Login';
import Routes from 'routes';
import themes from 'themes';
import NavigationScroll from 'layout/NavigationScroll';


const App = () => {
  const member = useSelector((state) => state.member);
  const customization = useSelector((state) => state.customization);
  const dispatch = useDispatch();

  const handleLoginSuccess = (user) => {
    // 이제 Redux 상태 업데이트 이후에 호출됩니다.
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <PersistGate loading={null} persistor={persistor}>
            {member.isLoggedIn ? (
              <Routes />
            ) : (
              <Login onAppLoginSuccess={handleLoginSuccess} />
            )}
          </PersistGate>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;