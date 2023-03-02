import { combineReducers } from 'redux'

import watchesReducer from './watchesReducer'

export default combineReducers({
    watches: watchesReducer,
})