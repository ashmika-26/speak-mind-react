import {
    SET_SCREAMS,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    SET_ERRORS,
    POST_SCREAM,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_SCREAM,
    STOP_LOADING_UI,
    SUBMIT_REPLY
  } from '../type';
  
  import axios from 'axios';
  
  // Get all screams
  export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/comments')
      .then((res) => {
        dispatch({
          type: SET_SCREAMS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_SCREAMS,
          payload: []
        });
      });
  };
  export const getScream = (commentId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(`/comment/${commentId}`)
      .then((res) => {
        dispatch({
          type: SET_SCREAM,
          payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };
  // Post a scream
  export const postScream = (newComment) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/comment', newComment)
      .then((res) => {
        dispatch({
          type: POST_SCREAM,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  // Like a scream
  export const likeScream = (commentId) => (dispatch) => {
    axios
      .get(`/comment/${commentId}/like`)
      .then((res) => {
        dispatch({
          type: LIKE_SCREAM,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  // Unlike a scream
  export const unlikeScream = (commentId) => (dispatch) => {
    axios
      .get(`/comment/${commentId}/unlike`)
      .then((res) => {
        dispatch({
          type: UNLIKE_SCREAM,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  // Submit a comment
  export const submitReply = (commentId, replyData) => (dispatch) => {
    axios
      .post(`/comment/${commentId}/reply`, replyData)
      .then((res) => {
        dispatch({
          type: SUBMIT_REPLY,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  export const deleteScream = (commentId) => (dispatch) => {
    axios
      .delete(`/comment/${commentId}`)
      .then(() => {
        dispatch({ type: DELETE_SCREAM, payload:commentId});
      })
      .catch((err) => console.log(err));
  };
  
  export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(`/user/${userHandle}`)
      .then((res) => {
        dispatch({
          type: SET_SCREAMS,
          payload: res.data.comments
        });
      })
      .catch(() => {
        dispatch({
          type: SET_SCREAMS,
          payload: null
        });
      });
  };
  
  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };