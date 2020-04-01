import React from 'react'
import { useParams } from 'react-router-dom'
import { Dimmer, Grid, Loader } from "semantic-ui-react";
import Swiper from 'react-id-swiper';
import useData from "../../hooks/useData";

export default function AlbumPage() {
    const { userId, albumId } = useParams();
    const [albumPhotos, isFetching] = useData(`/albums/${albumId}/photos`, []);

    const params = {
        effect: 'coverflow',
        grabCursor: true,
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        }
    };


    if (isFetching) return (
        <Grid.Column>
            <Dimmer active inverted><Loader /></Dimmer>
        </Grid.Column>
    );

    console.log(userId, albumId, 'params');
    return (
        <Grid.Column>
            <Swiper {...params}>
                {albumPhotos.map(albumPhoto =>  <img key={albumPhoto.id} src={albumPhoto.url} alt={albumPhoto.title}/>)}
            </Swiper>
        </Grid.Column>
    )
}
