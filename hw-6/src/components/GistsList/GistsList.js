import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchGists} from "../../redux/actions/gists";
import {showSelectedGist} from "../../redux/actions/selectedGist";
import Loader from "../Loader";

import './GistList.scss';

export default function GistsList() {
    const dispatch = useDispatch();

    const { isLoading, items } = useSelector(state => state.gists);

    console.log(items);

    useEffect(() => {
        dispatch(fetchGists());
    }, [dispatch]);

    const handleSelectedGist = (id) => {
        dispatch(showSelectedGist(id));
    };

    const gistsItems = items.map((gist) => {
                const file = Object.keys(gist.files)[0];
                const fileName = gist.files[file].filename;
            const language = gist.files[file].language ? <p>Language: <span className='gist-item__language'>{gist.files[file].language}</span></p> : <p>Language not select</p>;
                return <li key={gist.id}
                           className='gist-item'
                           onClick={()=> handleSelectedGist(gist.id)}>
                            <h2>{fileName}</h2>
                            {language}
                       </li>
            }
        );

    if(isLoading) return <Loader/>;

    return (
        <ol className='gist-list'>
            {gistsItems}
        </ol>
    )
}
