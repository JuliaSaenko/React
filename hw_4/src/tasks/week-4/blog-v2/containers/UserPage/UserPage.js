import React from 'react'
import { useParams, Switch, Route , useRouteMatch, Link} from 'react-router-dom'
import { Card, Image, Icon, Container, Dimmer, Loader, Header, List, Grid } from 'semantic-ui-react'
import useData from '../../hooks/useData';
import AlbumPage from '../AlbumPage/AlbumPage';
import NotFoundPage from '../404/404';

export default function UserPage() {
    const { userId } = useParams();
    let { path, url } = useRouteMatch();

    console.log(`path: ${path}, url: ${url}`);

    const [user, isFetching] = useData(`/users/${userId}`, null);
    const [ albums ] = useData(`${url}/albums`, []);

    if (isFetching || !user) return (
        <Container className='page'>
            <Dimmer active inverted><Loader /></Dimmer>
        </Container>
    );

    const albumsText =
        albums.length < 1
            ? <div className="ui active inline loader" size='mini'></div>
            : <span><Icon name='camera' />{albums.length} Albums</span>;

    console.log(`in user page`);

    return (
        <Container className='page'>
            <Grid columns={2}>
                <Grid.Column width={5}>
                    <Card>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>{user.name}</Card.Header>
                        <Card.Meta>
                            <span className='email'>{user.email}</span>
                        </Card.Meta>
                        <Card.Description>
                        {user.address.street} {user.address.suite}, {user.address.city}
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            { albumsText }
                        </Card.Content>
                        <Card.Content>
                        <List>
                        {albums.map(album => (
                            <List.Item key={album.id}>
                                <Link to={`${url}/albums/${album.id}`}>{album.title}</Link>
                            </List.Item>
                        ))}
                        </List>
                    </Card.Content>
                </Card>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Switch>
                        <Route exact path={path}>
                            <Header as='h3'>Select a album.</Header>
                        </Route>
                        <Route exact path={`${path}/albums/:albumId`}>
                            <AlbumPage />
                        </Route>
                        <Route path='*'>
                            <NotFoundPage/>
                        </Route>
                    </Switch>
                </Grid.Column>
            </Grid>
        </Container>
    )
}
