import { ADD_WATCHES }from '../actions'

const initialState = []

function watchesReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case ADD_WATCHES:
            return payload
        
        default:
            return state
    }
}

export default watchesReducer