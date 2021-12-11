import StaticAddIncomeForm from './components/StaticAddIncomeForm'
import IntervalDatePicker from './components/IntervalDatePicker'
import { getColor, ThemeProvider } from '@zendeskgarden/react-theming';
import { DEFAULT_THEME } from '@zendeskgarden/react-theming';
import IncomesourceDropdown from './components/IncomesourceDropdown'
import UsersDropdown from './components/UsersDropdown'
import AddIncomePage from './pages/AddIncomePage'
import CurrentInterval from './pages/CurrentInterval'


//<IntervalDatePicker startDate={'2021-08-09'} endDate={'2021-08-22'}/>
//
function App() {
  return (
    <div className="App">
      <ThemeProvider  theme={DEFAULT_THEME}>
        <CurrentInterval />
      </ThemeProvider>
    </div>
  );
}

export default App;
