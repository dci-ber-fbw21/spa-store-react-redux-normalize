import { combineReducers } from 'redux';
// App reducer goes here
import posts from '../data/posts';

const normalizedPosts = posts.reduce((acc, postEntry) => {
    acc[postEntry.id] = postEntry;

    return acc;
}, {});

const initialCommentsState = {
    comments: {}
};

// Comments reducer, it will be an object where the keys are the comment ids, and the value is the comment object
function commentsReducer(state = {}, action) {
    switch (action.type) {
        case 'ADD_COMMENT':
            return {
                ...state,
                [action.payload.comment.id]: {
                    ...action.payload.comment
                }
            }

        default:
            return state;
    }
}

// Posts reducer, it will be an object where the keys are the post ids and the values are the entire post
function postsReducer(state = { ...normalizedPosts }, action) {
    switch (action.type) {
        case 'ADD_COMMENT':
            // find post that comment belongs to
            // add comment to posts comments array
            const postToUpdate = state[action.payload.postId];
            const updatedComments = [...postToUpdate.comments, action.payload.comment.id];

            return {
                ...state,
                [action.payload.postId]: {
                    ...postToUpdate,
                    // here we link the comments with the post
                    // we use the comment id
                    comments: updatedComments
                }
            };
        case 'DELETE_COMMENT':
            // find post that comment belongs to
            // remove comment from posts comments array
            return state;
        default:
            return state;
    }
}

// Combine both reducers
export default combineReducers({
    comments: commentsReducer,
    posts: postsReducer
});