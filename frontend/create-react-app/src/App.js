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

import BoardList from './views/board-page/index'; // index.js 파일
import BoardWrite from './views/board-page/BoardWrite'; // boardwrite.js 파일
import BoardEdit from 'views/board-page/BoardEdit';//boardEdit.js 파일
import BoardDetail from 'views/board-page/BoardDetail';


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
            <Route path="/sample-page/BoardDetail" element={<BoardDetail />} />
            <Route path="/sample-page/Board" element={<BoardEdit />} />
        </Routes>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default App;