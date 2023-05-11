import Home from './Home.jsx'
import { Route, Routes } from 'react-router-dom'
import NavBar from './NavBar';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers'

import SearchedWatches from './SearchedWatches.jsx';
import CreateWatchListing from './CreateWatchListing.jsx';
import SingleWatchView from './SingleWatchView.jsx'
import Login from './Login.jsx';
import YourAccount from './YourAccount.jsx';
import Register from './Register.jsx';
import WatchBrands from './WatchBrands.jsx';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

function App() {

  return (
    <main className='App App-header'>
      <NavBar />      
      <WatchBrands/>
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/createWatchListing' element={<CreateWatchListing />} />
            <Route path=':searchedWatch' element={<SearchedWatches />} />
            <Route path='/singleWatchView/:watchId' element={<SingleWatchView />} />
            <Route path='/login' element={<Login />} /> 
            <Route path='/register' element={<Register />} /> 
            <Route path='/account/:accountId' element={<YourAccount />} />
          </Routes>
        </Provider>
    </main>
  );
}

export default App;
