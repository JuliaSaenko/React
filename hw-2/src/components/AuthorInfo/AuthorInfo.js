import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loader from "../loader";

import AuthorAlbums from '../AuthorAlbums';

import './AuthorInfo.scss'

export default class AuthorInfo extends Component {
    state = {
        authorAlbums: [],
        isAlbumsFetching: false,
        isAlbumsShown: false,
    };

    showAuthorAlbums = () => {
        this.setState({
            isAlbumsFetching: true,
        });

        fetch(`https://jsonplaceholder.typicode.com/users/${this.props.currentPostAuthor.id}/albums`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then((response) => {
                this.setState({
                    authorAlbums: response,
                    isAlbumsFetching: false,
                    isAlbumsShown: true,
                });
            });
    };

    render() {
        const { currentPostAuthor, isCurrentPostAuthorFetching } = this.props;
        const { isAlbumsFetching, isAlbumsShown, authorAlbums  } = this.state;

        if(isCurrentPostAuthorFetching) return <Loader/>;

        if(isAlbumsFetching) return (
            <div className="column column--fixed">
                <div className="author-info">
                    <p>Name: { currentPostAuthor.name }</p>
                    <p>Username: { currentPostAuthor.username }</p>
                    <p>Email: { currentPostAuthor.email }</p>
                    <p>City: { currentPostAuthor.address.city }</p>
                    <button
                        type='button'
                        onClick={()=> this.showAuthorAlbums()}>
                        Show author albums</button>
                    <p>Author albums are loading</p>
                </div>
            </div>

        );

        if(isAlbumsShown) return (
            <div className="column column--fixed">
                <div className="author-info">
                    <p>Name: { currentPostAuthor.name }</p>
                    <p>Username: { currentPostAuthor.username }</p>
                    <p>Email: { currentPostAuthor.email }</p>
                    <p>City: { currentPostAuthor.address.city }</p>
                    <p>Author albums: </p>
                    <AuthorAlbums authorAlbums = { authorAlbums }/>
                    <button
                        type='button'
                        onClick={()=> this.setState({isAlbumsShown: false})}>
                        Hide author albums
                    </button>
                </div>
            </div>
        );


        return (
            <div className="column column--fixed">
                <div className="author-info">
                    <p>Name: { currentPostAuthor.name }</p>
                    <p>Username: { currentPostAuthor.username }</p>
                    <p>Email: { currentPostAuthor.email }</p>
                    <p>City: { currentPostAuthor.address.city }</p>
                    <button
                        type='button'
                        onClick={()=> this.showAuthorAlbums()}>
                        Show author albums</button>
                 </div>
            </div>
        );

    }
}

AuthorInfo.propTypes = {
    currentPostAuthor: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        city: PropTypes.string,
        albums: PropTypes.array,
    }).isRequired,
    isCurrentPostAuthorFetching: PropTypes.bool.isRequired
};