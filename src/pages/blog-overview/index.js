import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class BlogOverview extends Component {
    render() {
        return (
            <div>
                <h1>Blog overview</h1>
                {/* posts list */}
                {
                    this.props.postEntries.map((post) => {
                        return (
                            <Link
                                to={`/blog/${post.id}`}
                                style={{ display: 'block', textDecoration: 'none', padding: '20px' }}
                                key={post.id}>
                                <h3>{post.title}</h3>

                                {post.comments.length > 0 ?
                                    <p>Comment: {post.comments.length}</p> :
                                    <p>No comments</p>
                                }
                            </Link>
                        );
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postEntries: Object.keys(state.posts).map((key) => {
            return state.posts[key]
        })
    }

}
export default connect(mapStateToProps)(BlogOverview);