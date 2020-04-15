import React from 'react';
import fox from './img/loader-2.gif';

import './Loader.scss';

export default function Loader() {
    return <div className='loader'><img src={fox} alt='loader'/></div>;
}
