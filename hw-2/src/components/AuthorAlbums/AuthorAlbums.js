import React from 'react';
import PropTypes from 'prop-types';


import AuthorAlbum from '../AuthorAlbum';

export default function AuthorAlbums({ authorAlbums}) {
    console.log(authorAlbums);
  return (
      <ul className="list album-list">
          {authorAlbums.map((album) =>
                  <AuthorAlbum
                      key={album.id}
                      album={ album }
                  />
          )}
      </ul>
  )

}

AuthorAlbums.propTypes = {
    authorAlbums: PropTypes.array.isRequired,
};