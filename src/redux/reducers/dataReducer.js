import {
    SET_SCREAMS,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    LOADING_DATA,
    DELETE_SCREAM,
    POST_SCREAM,
    SET_SCREAM,
    SUBMIT_REPLY
  } from '../type';
  
  const initialState = {
    comments: [],
    comment: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_SCREAMS:
        return {
          ...state,
          comments: action.payload,
          loading: false
        };
      case SET_SCREAM:
        return {
          ...state,
          comment: action.payload
        };
      case LIKE_SCREAM:
      case UNLIKE_SCREAM:
        var index = state.comments.findIndex(
          (comment) => comment.commentId === action.payload.commentId
        );
        state.comments[index] = action.payload;

        if (state.comment.commentId === action.payload.commentId) {
          let replies = state.comment.replies;
          state.comment = action.payload;
          state.comment.replies = replies;
        }
        return {
          ...state
        };
      
        case DELETE_SCREAM: 
          var delindex = state.comments.findIndex(
            (comment) => comment.commentId === action.payload
          );
          state.comments.splice(delindex,1);
          return {
            ...state
          };
        

      case POST_SCREAM:
        return {
          ...state,
          comments: [action.payload, ...state.comments]
        };
      case SUBMIT_REPLY:
        return {
          ...state,
          comment: {
            ...state.comment,
            replies: [action.payload, ...state.comment.replies]
          }
        };
      default:
        return state;
    }
  }