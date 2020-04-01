import React from 'react'
import { Container, Dimmer, Loader, Item } from 'semantic-ui-react';
import useData from '../../hooks/useData';
import PostItem from '../../components/PostItem/PostItem';

export default function PostsPage() {

    const [posts, isFetching] = useData('/posts', []);

    return (
        <Container className='page'>
            <Dimmer active={isFetching} inverted>
                <Loader>Loading...</Loader>
            </Dimmer>
            <Item.Group className='posts'>
                {posts.map(post => <PostItem key={post.id} post={post} />)}
            </Item.Group>
        </Container>
    )
}

