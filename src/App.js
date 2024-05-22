import './App.css';
import Header from './Components/Header/Header';
import SearchSection from './Components/SearchSection/SearchSection/SearchSection';
import SavedBooks from './Components/SavedBooks';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Components/Home/Home';
import ErrorPage from './Components/ErrorPage/ErrorPage';
function App() {
  return (
      <Router>
      <div>
        <Header/>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/search' Component={SearchSection}/>
          <Route path='/books' Component={SavedBooks}/>
          <Route path='*' Component={ErrorPage}/>
        </Routes>
      </div>  
    </Router>
  );
}

export default App;

