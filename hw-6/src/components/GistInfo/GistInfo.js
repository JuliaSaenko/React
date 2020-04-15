import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneSpace } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {fetchGistContent, getCurrentGistLanguage} from "../../redux/actions/selectedGist";
import Loader from "../Loader";

import './GistInfo.scss';

export default function GistInfo() {
    const {selectedGist, item, isGistLoading, language } = useSelector(state => state.selectedGist);
    const { items, isLoading } = useSelector(state => state.gists);
    const dispatch = useDispatch();
    const currentGist = items.find(item => item.id === selectedGist);
    let selectedItem = item;

    if(item && typeof item === 'object') { ///проблемы с отображением json и Jupyter Notebook, редакс ругается, что объекты нельзя помещать в SyntaxHighlighter
        selectedItem = JSON.stringify(item);
    }

    useEffect(() => {
        if(currentGist) {
            const file = Object.keys(currentGist.files)[0];
            const fileUrl = currentGist.files[file].raw_url;
            const fileLanguage = currentGist.files[file].language ? currentGist.files[file].language.toLowerCase().replace(/\s+/g, '').trim() : null;
            dispatch(fetchGistContent(fileUrl));
            dispatch(getCurrentGistLanguage(fileLanguage));
        }
    }, [dispatch, currentGist]);

    if(isLoading || isGistLoading) return <div className='gist-info'><Loader/></div>;

    if(!currentGist) return <div className='gist-info'><h2>Select a gist</h2></div>;

    if(currentGist) return (
        <div className='gist-info'>
            <div className='gist-info__wrapper'>
                <SyntaxHighlighter language={language}  style={duotoneSpace}>
                    {selectedItem}
                </SyntaxHighlighter>
            </div>

        </div>
    )
}
