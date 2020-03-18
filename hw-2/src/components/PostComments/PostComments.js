import React from 'react';
import PropTypes from 'prop-types';

import PostComment from '../PostComment';

import './PostComments.scss';

export default function PostComments({ comments }) {
    return(
        <ul className="list blog-posts__comments comments">
            {comments.map(comment =>
                <PostComment
                    key={comment.id}
                    comment={ comment }
                />
            )}
        </ul>

    )
}

PostComments.propTypes = {
    comments: PropTypes.array.isRequired,
};