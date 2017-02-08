import React from 'react';
import Albums from '../components/Albums'
import axios from 'axios';


class Artist extends React.Component {
  constructor(props){
    super(props);
    // const album = props.album;
    // const currentSong = props.currentSong;
    // const isPlaying = props.isPlaying;
    // const toggleOne = props.toggleOne;
    this.albumsByArtist=[]
    this.songsByArtist = []
  }

  componentDidMount(){
    let gettingAlbums = axios.get(`/api/${this.props.routeParams.artistId}/albums`)
      .then(res => res.data)
      .then(albums => {this.albumsByArtist = albums});
    let gettingSongs =  axios.get(`/api/${this.props.routeParams.artistId}/songs`)
      .then(res => res.data)
      .then(songs => {this.songsByArtist = songs});
    Promise.all([gettingAlbums,gettingSongs])
    .then(() => {this.props.selectArtist(this.props.routeParams.artistId);})
    //State change that causes rerendering
  }

  render(){
  return (
    <div className="artist">
      <div>
        <h3>{ this.props.selectArtist.name }</h3>
        <h4> ALBUMS </h4>
        {this.albumsByArtist.map((album) =>(
          <img src={ album.imageUrl } className="img-thumbnail" />
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

export default Artist
