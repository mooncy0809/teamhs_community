import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

import {Route} from 'react-router-dom';

import BoardList from './views/sample-page/index'; // index.js 파일
import BoardWrite from './views/sample-page/boardwrite'; // boardwrite.js 파일
import BoardWatch from 'views/sample-page/boardwatch'; //boardwatch.js 파일
// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
        <Routes>
            <Route path="/sample-page" element={<BoardList />} />
            <Route path="/sample-page/boardwrite" element={<BoardWrite />} />
            <Route path="/sample-page/boardwatch" element={<BoardWatch />} />
        </Routes>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default App;
