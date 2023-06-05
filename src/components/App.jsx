import Home from './Home.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './NavBar';
import { Provider} from 'react-redux';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers'

import SearchedWatches from './SearchedWatches.jsx';
import CreateWatchListing from './CreateWatchListing.jsx';
import SingleWatchView from './SingleWatchView.jsx'
import Login from './Login.jsx';
import YourAccount from './YourAccount.jsx';
import Register from './Register.jsx';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

function App() {

  return (
    <Provider store={store}>
      <main className='App App-header'>
        <NavBar />      
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/createWatchListing' element={<CreateWatchListing />} />
              <Route path='/searchedWatch/:searchedWatch' element={<SearchedWatches />} />
              <Route path='/singleWatchView/:watchId' element={<SingleWatchView />} />
              <Route path='/login' element={<Login />} /> 
              <Route path='/register' element={<Register />} /> 
              <Route path='/account/:accountId' element={<YourAccount />} />
              {/* <Route path='*' element={<Home />} /> */}
            </Routes>
      </main>
    </Provider>
  );
}

export default App;
