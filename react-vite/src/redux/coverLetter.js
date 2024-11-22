// Action Types
const SET_COVER_LETTERS = 'coverLetters/setCoverLetters';
const SET_COVER_LETTER = 'coverLetters/setCoverLetter';
const ADD_COVER_LETTER = 'coverLetters/addCoverLetter';
const UPDATE_COVER_LETTER = 'coverLetters/updateCoverLetter';
const DELETE_COVER_LETTER = 'coverLetters/deleteCoverLetter';

// Action Creators
const setCoverLetters = (coverLetters) => ({
  type: SET_COVER_LETTERS,
  payload: coverLetters,
});

const setCoverLetter = (coverLetter) => ({
  type: SET_COVER_LETTER,
  payload: coverLetter,
});

const addCoverLetter = (coverLetter) => ({
  type: ADD_COVER_LETTER,
  payload: coverLetter,
});

const updateCoverLetter = (coverLetter) => ({
  type: UPDATE_COVER_LETTER,
  payload: coverLetter,
});

const deleteCoverLetter = (coverLetterId) => ({
  type: DELETE_COVER_LETTER,
  payload: coverLetterId,
});

// Thunks

// Fetch all cover letters for the current user
export const thunkFetchCoverLetters = () => async (dispatch) => {
  const response = await fetch('/api/cover_letters/');
  if (response.ok) {
    const data = await response.json();
    dispatch(setCoverLetters(data.cover_letters));
  }
};

// Fetch a cover letter by ID
export const thunkFetchCoverLetterByID = (id) => async (dispatch) => {
  const response = await fetch(`/api/cover_letters/${id}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setCoverLetter(data));
  }
};

// Create a cover letter
export const thunkCreateCoverLetter = (coverLetterData) => async (dispatch) => {
  const response = await fetch('/api/cover_letters/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(coverLetterData),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addCoverLetter(data));
  }
};

// Update a cover letter
export const thunkUpdateCoverLetter = (id, coverLetterData) => async (dispatch) => {
  const response = await fetch(`/api/cover_letters/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(coverLetterData),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(updateCoverLetter(data));
  }
};

// Delete a cover letter
export const thunkDeleteCoverLetter = (id) => async (dispatch) => {
  const response = await fetch(`/api/cover_letters/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteCoverLetter(id));
  }
};

// Reducer
const initialState = {
  coverLetters: [],
  coverLetter: null,
};

function coverLettersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COVER_LETTERS:
      return { ...state, coverLetters: action.payload };
    case SET_COVER_LETTER:
      return { ...state, coverLetter: action.payload };
    case ADD_COVER_LETTER:
      return { ...state, coverLetters: [...state.coverLetters, action.payload] };
    case UPDATE_COVER_LETTER:
      return {
        ...state,
        coverLetters: state.coverLetters.map((coverLetter) =>
          coverLetter.id === action.payload.id ? action.payload : coverLetter
        ),
      };
    case DELETE_COVER_LETTER:
      return {
        ...state,
        coverLetters: state.coverLetters.filter(
          (coverLetter) => coverLetter.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

export default coverLettersReducer;
