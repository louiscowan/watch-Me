export const ADD_WATCHES = 'ADD_WATCHES'

export function addWatchesAction(watches) {
    return {
        type: ADD_WATCHES,
        payload: watches
    }
}
