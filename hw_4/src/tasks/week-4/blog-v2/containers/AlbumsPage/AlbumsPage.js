import React from 'react'
import {Container, Dimmer, Item, Loader} from "semantic-ui-react";
import AlbumItem from "../../components/AlbumItem/AlbumItem";
import useData from "../../hooks/useData";

export default function AlbumsPage() {
    const [albums, isFetching] = useData('/albums', []);

    return (
        <Container className='page'>
            <Dimmer active={isFetching} inverted>
                <Loader>Loading...</Loader>
            </Dimmer>
            <Item.Group className='albums'>
                {albums.map(album => <AlbumItem key={album.id} album={album}/>)}
            </Item.Group>
        </Container>
    )
}
