import React, { useState } from 'react';
import axios from 'axios';

import { Consumer } from '../../context';

export default function Search() {
  const [trackTitle, setTrackTitle] = useState('');

  const handleChange = e => {
    setTrackTitle(e.target.value);
  };

  const findTrack = (dispatch, e) => {
    e.preventDefault();

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(({ data }) => {
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: data.message.body.track_list
        });

        setTrackTitle('');
      })
      .catch(err => console.log(err));
  };

  return (
    <Consumer>
      {({ dispatch }) => {
        return (
          <div className="card card-body mb-4 p-4">
            <h1 className="display-4 text-center">
              <i className="fas fa-music"></i> Search For A Song
            </h1>
            <p className="lead text-center">Get the lyrics for any song</p>
            <form onSubmit={e => findTrack(dispatch, e)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Song title..."
                  name="trackTitle"
                  value={trackTitle}
                  onChange={handleChange}
                />
              </div>
              <button
                className="btn btn-primary btn-lg btn-block mb-5"
                type="submit"
              >
                Get Track Lyrics
              </button>
            </form>
          </div>
        );
      }}
    </Consumer>
  );
}
