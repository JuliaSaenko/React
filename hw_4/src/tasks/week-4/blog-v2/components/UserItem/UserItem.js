import React from 'react'
import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react';

export default function UserItem({ user }) {

    return (
        <Item>
            <Item.Content>
                <Item.Header as='a'>{user.name}</Item.Header>
                <Item.Description>
                    {user.address.city}
                </Item.Description>
                <Item.Extra>
                    <Link to={`/users/${user.id}`}>View {user.name} profile</Link>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}
