import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import Router from "./navigation/Router";
import { store } from "./store";
import './index.css';
import { GA_TRACK_ID } from './utils/constants';

ReactGA.initialize(GA_TRACK_ID);

function App() {
  return (
    <Provider store={store}>
      <div className="w-full h-full">
        <p className="fixed bottom-0 p-3 bg-sky-300 italic">
          SFSU Software Engineering Project CSC 648-848, Fall 2022. For Demonstration Only
        </p>
        <Router />
      </div>
    </Provider>
  );
}

export default App;
