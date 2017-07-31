import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ENHANCEMENT_TAGS = 'GET_ENHANCEMENT_TAGS';
const ADD_ENHANCEMENT_TAG = 'ADD_ENHANCEMENT_TAG';
const REMOVE_ENHANCEMENT_TAG = 'REMOVE_ENHANCEMENT_TAG';

/**
 * ACTION CREATORS
 */
const getEnhancementTags = tags => ({ type: GET_ENHANCEMENT_TAGS, tags });
const addEnhancementTag = tag => ({ type: ADD_ENHANCEMENT_TAG, tag });
const removeEnhancementTag = tag => ({ type: REMOVE_ENHANCEMENT_TAG, tag });

/**
 * REDUCER
 */

export default function reducer(enhancementTags = [], action) {
  switch (action.type) {
    case GET_ENHANCEMENT_TAGS:
      return action.tags;

    case ADD_ENHANCEMENT_TAG:
      return [action.tag, ...enhancementTags];

    case REMOVE_ENHANCEMENT_TAG:
      const removeIdx = enhancementTags.indexOf(enhancementTag => enhancementTag.id === action.tag.id);
      return enhancementTags.slice(0, removeIdx).concat(enhancementTags.slice(removeIdx + 1));

    default:
      return enhancementTags;
  }
}

/**
 * THUNK CREATORS
 */

export const fetchEnhancementTags = () => (dispatch) => {
  return axios.get('/api/enhancement-tags')
    .then(res => res.data)
    .then((tags) => {
      dispatch(getEnhancementTags(tags));
    })
    .catch(err => console.error('fetching tags unsucessful', err));
};

