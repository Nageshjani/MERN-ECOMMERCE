
import './App.css';
import {DataProvider} from './GlobalState'
import Header from './components/headers/Header';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Pages from './components/mainpages/Pages';

const App = () => {
  
  return (
    <DataProvider>
        <Router>
            <div className="App">
              <Header/>
              < Pages/>
          </div>
        </Router >
    </DataProvider>    
   
  );
};

export default App;


