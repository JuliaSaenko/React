import React, {Component} from 'react';

import BlogPosts from '../BlogPosts';
import AuthorInfo from '../AuthorInfo';
import Loader from '../loader';

import './App.scss';

export default class App extends Component {
    state = {
        blogPosts: [],
        isFetching: false,
        currentPostAuthor: null,
        isCurrentPostAuthorFetching: false,
    };

    componentDidMount() {
        this.setState({ isFetching: true });
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then((response) => {
                console.log(response);
                this.setState({
                    blogPosts: response,
                    isFetching: false,
                });
            })
    }

    onPostTitleClick = (value) => {
            this.setState({
                isCurrentPostAuthorFetching: true,
            });

            fetch(`https://jsonplaceholder.typicode.com/users/${value}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong ...');
                    }
                })
                .then((response) => {
                    this.setState({
                        currentPostAuthor: response,
                        isCurrentPostAuthorFetching: false,
                    });
                });
    };



    render() {
        const { isFetching, blogPosts, currentPostAuthor, isCurrentPostAuthorFetching } = this.state;
        if (isFetching) return <Loader/>;

        if(currentPostAuthor) {
            return (
                <div className="container">
                    <BlogPosts
                        blogPosts={ blogPosts }
                        onPostTitleClick = { this.onPostTitleClick }
                    />
                    <AuthorInfo
                        currentPostAuthor = { currentPostAuthor }
                        isCurrentPostAuthorFetching = { isCurrentPostAuthorFetching }
                    />
                </div>
            )
        }

        return (
            <div className="container">
                <BlogPosts
                    blogPosts={ blogPosts }
                    onPostTitleClick = { this.onPostTitleClick }
                />
            </div>
        );
    }

}
