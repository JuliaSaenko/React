import React from 'react'

import UserItem from "../../components/UserItem/UserItem";
import useData from "../../hooks/useData";
import {Container, Dimmer, Item, Loader} from "semantic-ui-react";


export default function UsersPage() {
    const [users, isFetching] = useData('/users', []);

    return (
        <Container className='page'>
            <Dimmer active={isFetching} inverted>
                <Loader>Loading...</Loader>
            </Dimmer>
            <Item.Group className='posts'>
                {users.map(user => <UserItem key={user.id} user={user} />)}
            </Item.Group>
        </Container>
    )
}
