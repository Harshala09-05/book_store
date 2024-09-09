import logo from './logo.svg';
import './App.css';
import LeftCard from './Pages/Login/LeftCard';
import DashBoard from './Pages/DashBoard/DashBoard';
import DataContext from './Context/DataProvider';
import BookDetails from './Component/BookDetails';
import Router from './Router/Router';
import { Provider } from 'react-redux';
import store from './Component/Reducer/Store'


function App() {
  return (
    <div className="App">
      {/* <LeftCard/> */}
      {/* <DataContext> */}
      <Provider store= { store }>
      <Router/>
      </Provider>
        
      {/* </DataContext> */}
      {/* <BookDetails/> */}
    </div>
  );
}

export default App;
