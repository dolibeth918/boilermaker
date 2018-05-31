// not using combineReducers yet but should for modularity
import { combineReducers } from 'redux';

// EXAMPLE OF USING COMBINEREDUCERS BELOW

// const allPuppiesReducer = function(state = [], action) {
//   switch (action.type) {
//     case RECIEVE_PUPPIES:
//       return action.puppies;
//     default:
//       return state;
//   }
// };

// const singlePuppyReducer = function(state = {}, action) {
//   switch (action.type) {
//     case SELECT_PUPPY:
//       return action.puppy;
//     default:
//       return state;
//   }
// };

// const rootReducer = combineReducers({
//   allPuppies: allPuppiesReducer,
//   singlePuppy: singlePuppyReducer
// });

// export default rootReducer;

// for now, using a dummy reducer

const initialState = {
  name: 'dolibeth'
};

const reducer = (state = initialState, action) => {
  return state;
};

export default reducer;
