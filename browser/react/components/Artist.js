import React from 'react';
import Albums from './Albums';
import axios from 'axios';
import Songs from './Songs';
import { convertAlbums, convertSong } from '../utils';

class Artist extends React.Component {
  constructor(props){
    super(props);
    // const album = props.album;
    // const currentSong = props.currentSong;
    // const isPlaying = props.isPlaying;
    // const toggleOne = props.toggleOne;
    this.albumsByArtist = [];
    this.songsByArtist = [];
  }
//
  componentDidMount(){
    let gettingAlbums = axios.get(`/api/artists/${this.props.routeParams.artistId}/albums`)
      .then(res => res.data)
      .then(albums => {this.albumsByArtist = convertAlbums(albums);});
    let gettingSongs =  axios.get(`/api/artists/${this.props.routeParams.artistId}/songs`)
      .then(res => res.data)
      .then(songs => Promise.all(songs.map(convertSong)))
      .then((convertedSongs) => {this.songsByArtist = convertedSongs;});
    Promise.all([gettingAlbums, gettingSongs])
    .then(() => {this.props.selectArtist(this.props.routeParams.artistId);});
    //State change that causes rerendering
  }


  render(){
    console.log('songs' , this.songsByArtist);
  return (
    <div className="artist">
      <div>
        <h3>{ this.props.selectedArtist.name }</h3>
        <h4> ALBUMS </h4>
        {this.albumsByArtist.map((album) => (
        <div key={album.id}>
          <h3>{ album.name }</h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
           ))
        }

      </div>
      <Songs
        songs={this.songsByArtist}
        currentSong={this.props.currentSong}
        isPlaying={this.props.isPlaying}
        toggleOne={this.props.toggleOne} />
    </div>
  );
}
}

export default Artist;
