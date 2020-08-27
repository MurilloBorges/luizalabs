export const Types = {
  LOADING: 'LOADER',
  CLEAR: 'CLEAR',
};

export const initialState = {
  loading: false,
};

export function loader(state = initialState, action) {
  switch (action.type) {
    case Types.LOADING:
      return {
        ...state, ...action.payload,
      };
    case Types.CLEAR:
      return {
        ...state,
        loading: false,
      };
    default:
      return { ...state };
  }
}
