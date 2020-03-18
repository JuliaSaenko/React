import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PostComments from '../PostComments';
import Loader from '../loader';

import './BlogPost.scss';

export default class BlogPost extends Component {
    state = {
        opened: false,
        comments: [],
        isCommentsFetching: false,
    };

    openPostFullInfo = () => {
        this.setState(prevState => ({
            opened: !prevState.opened
        }));

        this.props.onPostTitleClick(this.props.post.userId);

        let fetchLink = 'https://jsonplaceholder.typicode.com/posts/';

        this.setState({
            isCommentsFetching: true,
        });

        fetch(`${fetchLink}${this.props.post.id}/comments`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then((response) => {
                this.setState({
                    comments: response,
                    isCommentsFetching: false,
                });
            })
    };

    render() {
        const { post } = this.props;
        const { opened, comments, isCommentsFetching } = this.state;

        if(isCommentsFetching) return <Loader/>;

        if (opened) return (
            <li className="blog-posts__item blog-posts__item--opened">
                <h2
                    className="blog-posts__item-title"
                    onClick={() => this.openPostFullInfo()}>
                    { post.title }
                </h2>
                <p
                    className="blog-posts__item-text">
                    { post.body }
                </p>
                <PostComments comments = { comments }/>
            </li>
        );

        return (
           <li className="blog-posts__item">
               <h2
                   className="blog-posts__item-title"
                   onClick={() => this.openPostFullInfo()}>
                 { post.title }
               </h2>
           </li>
        )
    }
}

BlogPost.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        body: PropTypes.string,
        comments: PropTypes.array,
    }).isRequired,
    onPostTitleClick: PropTypes.func.isRequired,
};