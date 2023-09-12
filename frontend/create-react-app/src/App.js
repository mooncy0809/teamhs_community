import { useSelector} from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import Login from './views/pages/authentication/authentication3/Login';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

const App = () => {
  const member = useSelector((state) => state.member);
  const customization = useSelector((state) => state.customization);

  
  const handleLoginSuccess = () => {
    // 이제 Redux 상태 업데이트 이후에 호출됩니다.
  };
 
  
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          {member.isLoggedIn ? (
            <Routes />
          ) : (
            <Login onAppLoginSuccess={handleLoginSuccess} />
          )}
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
