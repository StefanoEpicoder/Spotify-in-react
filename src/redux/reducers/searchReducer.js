const initialState = {
    searchResults: []
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return {
              ...state,
                searchResults: action.payload
            }
        case 'CLEAR_SEARCH_RESULTS':
            return {
             ...state,
                searchResults: []
            }
        default:
            return state
    }
}

export default searchReducer