import React from 'react';

import { BrowserRouter as Router , Switch, NavLink, Route,  __RouterContext } from 'react-router-dom';

import { Container, Header, Menu } from 'semantic-ui-react';
import { animated, useTransition } from 'react-spring';

import useRouter from './hooks/useRouter';
import HomePage from './containers/HomePage/HomePage';
import PostsPage from './containers/PostsPage/PostsPage';
import UsersPage from './containers/UsersPage/UsersPage';
import AlbumsPage from './containers/AlbumsPage/AlbumsPage';
import UserPage from './containers/UserPage/UserPage';
import NotFoundPage from './containers/404/404';

import './blog-v2.css';

const Main = () => {
    const { location } = useRouter();

    const transitions = useTransition(location, location => location.key, {
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        leave: {
            opacity: 0,
        }
    });

    return transitions.map(({ item, props: transition, key }) => (
        <animated.div key={key} style={transition} className="contaier">
            <Switch location={item}>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                <Route path='/posts' exact>
                    <PostsPage />
                </Route>
                <Route path='/users' exact>
                    <UsersPage />
                </Route>
                <Route path='/users/:userId'>
                    <UserPage />
                </Route>
                <Route path='/albums' exact>
                    <AlbumsPage />
                </Route>
                <Route path='*'>
                    <NotFoundPage />
                </Route>
            </Switch>
        </animated.div>
    ))
};

export default function Blog() {
    return (
        <Container>
            <Router>
                <Header>
                    <NavLink to='/' activeClassName='active-nav'>Blog V2</NavLink>
                </Header>
                <Menu>
                    <NavLink to='/posts' className='item' activeClassName='active-nav'>Posts</NavLink>
                    <NavLink to='/users' className='item' activeClassName='active-nav'>Users</NavLink>
                    <NavLink to='/albums' className='item' activeClassName='active-nav'>Albums</NavLink>
                </Menu>
                <Main />
            </Router>
        </Container>
    )
}
