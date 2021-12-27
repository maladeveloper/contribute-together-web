import { ThemeProvider } from '@zendeskgarden/react-theming';
import { DEFAULT_THEME } from '@zendeskgarden/react-theming';
import HomePage from './pages/HomePage'


function App() {
  return (
      <ThemeProvider  theme={DEFAULT_THEME}>
        <HomePage/>
      </ThemeProvider>
  );
}

export default App;
