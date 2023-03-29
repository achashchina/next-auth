export const initialState = {
    pathname: ''
  };
  
  import { createSlice } from '@reduxjs/toolkit';
  // Slice
  const slice = createSlice({
    name: 'activePage',
    initialState,
    reducers: {
      setActivePath: (state, action) => {
        state.pathname = action.payload.pathname;
        // console.log(JSON.parse(JSON.stringify(state)));
      },
    },
  });
  export default slice.reducer;
  
  // Actions
  const { setActivePath } = slice.actions;
  export const setActivePathAction = (pathname) => async (dispatch) => {
    try {
      dispatch(setActivePath({ pathname }))
    } catch (e) {
      return console.error(e.message);
    }
  };
  