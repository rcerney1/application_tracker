// Action Types
const SET_APPLICATIONS = 'applications/setApplications';

//singlular application for handling application by id
const SET_APPLICATION = 'applications/setApplication'

const ADD_APPLICATION = 'applications/addApplication';
const UPDATE_APPLICATION = 'applications/updateApplication';
const DELETE_APPLICATION = 'applications/deleteApplication';
const SET_APPLICATION_SUMMARY = 'applications/setApplicationSummary'

// Action Creators
const setApplications = (applications) => ({
  type: SET_APPLICATIONS,
  payload: applications,
});

const setApplication = (application) => ({
    type: SET_APPLICATION,
    payload: application,
})
const addApplication = (application) => ({
  type: ADD_APPLICATION,
  payload: application,
});

const updateApplication = (application) => ({
  type: UPDATE_APPLICATION,
  payload: application,
});

const deleteApplication = (applicationId) => ({
  type: DELETE_APPLICATION,
  payload: applicationId,
});

const setApplicationSummary = (summary) => ({
    type: SET_APPLICATION_SUMMARY,
    payload: summary,
})

// Thunks
// Get all applications of the current user
export const thunkFetchApplications = () => async (dispatch) => {
  const response = await fetch('/api/applications/');
  if (response.ok) {
    const data = await response.json();
    dispatch(setApplications(data.applications));
  }
};

// Get application by Id
export const thunkFetchApplicationByID = (id) => async (dispatch) => {
    const response = await fetch(`/api/applications/${id}`);
    if (response.ok){
        const data = await response.json();
        dispatch(setApplication(data))
    }
}

export const thunkCreateApplication = (applicationData) => async (dispatch) => {
  const response = await fetch('/api/applications/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(applicationData),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addApplication(data));
  }
};

export const thunkUpdateApplication = (id, applicationData) => async (dispatch) => {
  const response = await fetch(`/api/applications/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(applicationData),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(updateApplication(data));
  }
};

export const thunkDeleteApplication = (id) => async (dispatch) => {
  const response = await fetch(`/api/applications/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteApplication(id));
  }
};

export const thunkFetchApplicationSummary = () => async (dispatch) => {
    const response = await fetch('/api/applications/summary');
    if (response.ok) {
        const data = await response.json();
        dispatch(setApplicationSummary(data.summary))
    }
}

// Reducer
const initialState = { 
    applications: [],
    application: null,
    summary: {
        total: 0,
        applied: 0,
        interviewed: 0,
        offered: 0,
        rejected: 0,
    },
};

function applicationsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_APPLICATIONS:
      return { ...state, applications: action.payload };
    case ADD_APPLICATION:
      return { ...state, applications: [...state.applications, action.payload] };
    case UPDATE_APPLICATION:
      return {
        ...state,
        applications: state.applications.map((app) =>
          app.id === action.payload.id ? action.payload : app
        ),
      };
    case DELETE_APPLICATION:
      return {
        ...state,
        applications: state.applications.filter(
          (app) => app.id !== action.payload
        ),
      };
    case SET_APPLICATION:
        return {
            ...state,
            application: action.payload
        };
    case SET_APPLICATION_SUMMARY:
        return {
            ...state,
            summary: action.payload
        };
    default:
      return state;
  }
}

export default applicationsReducer;
