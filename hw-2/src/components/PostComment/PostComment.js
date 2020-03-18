import React, {Component} from 'react';
import PropTypes from 'prop-types';


import './PostComment.scss';

export default class PostComment extends Component {
    render() {
        const { comment } = this.props;
        return (
            <li className="comments__item">
                <h3>{ comment.name }</h3>
                <p>{ comment.email }</p>
                <blockquote>{ comment.body }</blockquote>
            </li>
        )
    }
}

PostComment.propTypes = {
    comment: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        body: PropTypes.string,
    }).isRequired,
};