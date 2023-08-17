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

import BoardList from './views/Community/index'; // index.js 파일
import BoardWrite from './views/Community/boardwrite'; // boardwrite.js 파일
import BoardWatch from 'views/Community/boardwatch'; //boardwatch.js 파일
import BoardEdit from 'views/Community/boardEdit';//boardEdit.js 파일


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
            <Route path="/sample-page/boardEdit" element={<BoardEdit />} />
        </Routes>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default App;