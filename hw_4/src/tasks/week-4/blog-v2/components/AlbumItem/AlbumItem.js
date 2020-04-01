import React from 'react'
import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react';

export default function AlbumItem ({album }) {

    return (
        <Item>
            <Item.Content>
                <Item.Header as='a'>{album.title}</Item.Header>
                <Item.Extra>
                    <Link to={`/users/${album.userId}/albums/${album.id}`}>View album photos</Link>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}