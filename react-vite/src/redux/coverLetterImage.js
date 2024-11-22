// Action Types
const ADD_COVER_LETTER_IMAGE = 'coverLetterImages/addCoverLetterImage';
const UPDATE_COVER_LETTER_IMAGE = 'coverLetterImages/updateCoverLetterImage';
const DELETE_COVER_LETTER_IMAGE = 'coverLetterImages/deleteCoverLetterImage';

// Action Creators

const addCoverLetterImage = (image) => ({
  type: ADD_COVER_LETTER_IMAGE,
  payload: image,
});

const updateCoverLetterImage = (image) => ({
  type: UPDATE_COVER_LETTER_IMAGE,
  payload: image,
});

const deleteCoverLetterImage = (imageId) => ({
  type: DELETE_COVER_LETTER_IMAGE,
  payload: imageId,
});

// Thunks
// Add an image to a cover letter
export const thunkAddCoverLetterImage = (coverLetterId, imageData) => async (dispatch) => {
  const response = await fetch(`/api/cover_letters/${coverLetterId}/image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(imageData),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addCoverLetterImage(data));
  }
};

// Update the image of an existing cover letter
export const thunkUpdateCoverLetterImage = (coverLetterId, imageData) => async (dispatch) => {
  const response = await fetch(`/api/cover_letters/${coverLetterId}/image`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(imageData),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(updateCoverLetterImage(data));
  }
};

// Delete the image from a cover letter
export const thunkDeleteCoverLetterImage = (coverLetterId) => async (dispatch) => {
  const response = await fetch(`/api/cover_letters/${coverLetterId}/image`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteCoverLetterImage(coverLetterId));
  }
};

// Reducer
const initialState = { image: null };

function coverLetterImagesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COVER_LETTER_IMAGE:
      return { ...state, image: action.payload };
    case UPDATE_COVER_LETTER_IMAGE:
      return { ...state, image: action.payload };
    case DELETE_COVER_LETTER_IMAGE:
      return { ...state, image: null };
    default:
      return state;
  }
}

export default coverLetterImagesReducer;
