import React, { Component } from 'react';
import { connect } from 'react-redux';

class BlogDetails extends Component {
    state = {
        comment: ''
    }

    render() {
        return (
            <div>
                {/* posts details page */}
                <h1>Blog details</h1>
                {/* We get this prop from the router, this is the dynamic part of the URL */}
                <p>{this.props.match.params.id}</p>

                {
                    this.props.currentPost &&
                    <h2>{this.props.currentPost.title}</h2>
                }

                {/* Comment form, this could be a separate component */}
                <form onSubmit={
                    (e) => {
                        e.preventDefault();

                        // send comment to redux store
                        // pass along the id from the react router
                        this.props.addComment(this.props.match.params.id, {
                            id: Date.now(),
                            text: this.state.comment
                        });

                        this.setState({
                            comment: ''
                        });
                    }
                }>
                    <textarea value={this.state.comment} onChange={(e) => {
                        this.setState({
                            comment: e.target.value
                        })
                    }}></textarea>
                    <button>Comment</button>
                </form>

                {
                    this.props.comments.map((comment) => {

                        return (
                            <div>{comment.text}</div>
                        )
                    })
                }
            </div>
        )
    }
}

// Extracting data from store, and adding it as props to the component
const mapStateToProps = (state, ownProps) => {
    const currentPost = state.posts[ownProps.match.params.id];

    return {
        currentPost,
        // here we loop over the comment ids stored in the current post
        // and we return the entire comment object
        comments: currentPost.comments.map((comment) => {
            return state.comments[comment];
        })
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        addComment: (id, comment) => {
            dispatch({
                type: 'ADD_COMMENT',
                payload: {
                    postId: id,
                    comment
                }
            });
        }
    }
}

const connectFunction = connect(
    mapStateToProps,
    mapActionsToProps
);

export default connectFunction(BlogDetails);