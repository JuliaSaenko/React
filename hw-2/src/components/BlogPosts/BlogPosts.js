import React from 'react';
import PropTypes from 'prop-types';

import BlogPost from '../BlogPost';
import './BlogPosts.scss'

export default function BlogPosts({ blogPosts, onPostTitleClick }) {
    return (
            <ol className="column list blog-posts">
                {blogPosts.map(blogPost =>
                    <BlogPost
                        key={blogPost.id}
                        post={ blogPost }
                        onPostTitleClick ={ onPostTitleClick }
                    />
                )}
            </ol>
    )
};

BlogPosts.propTypes = {
    blogPosts: PropTypes.array.isRequired,
    onPostTitleClick: PropTypes.func.isRequired,
};