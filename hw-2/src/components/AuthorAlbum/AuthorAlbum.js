import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './AuthorAlbum.scss'
import BlogPost from "../BlogPost";

export default class AuthorAlbum extends Component {
    render() {
        const { album } = this.props;

        return (
            <li className="album-list__element">{ album.title }</li>
        )
    }
}

AuthorAlbum.propTypes = {
    album: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,
};