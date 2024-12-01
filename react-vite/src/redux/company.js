// Action Types
const SET_COMPANIES = "companies/setCompanies";

// Action Creators
const setCompanies = (companies) => ({
  type: SET_COMPANIES,
  payload: companies,
});

// Thunk for fetching all companies
export const thunkFetchCompanies = () => async (dispatch) => {
  const response = await fetch("/api/companies/");
  if (response.ok) {
    const data = await response.json();
    dispatch(setCompanies(data.companies));
  }
};

// Reducer
const initialState = [];

export default function companiesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMPANIES:
      return action.payload;
    default:
      return state;
  }
}
