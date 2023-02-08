import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import 'script-loader!//r.dcs.redcdn.pl/file/o2/web/player/redcdn/2.33.0/js/redgalaxy-player-2.33.0.min.js';
import { useAppDispatch } from "../..";
import { getSelectedMovieDataSelector } from "../../store/movieDataReducer/movieDataReducer.selectors";
import { getSelectedMovieData } from "../../store/movieDataReducer/movieDataReducer.thunks";
import "./movieDetails.css";

const MovieDetails = () => {
  const { movieId, movieType } = useParams()
  const dispatch = useAppDispatch()
  const movieDetails = useSelector(getSelectedMovieDataSelector)

  const typeToLink = (type: string | undefined): string => {
    switch(type) {
      case 'VOD':
        return 'vods';
      case 'LIVE':
        return 'lives';
      case 'SERIAL':
        return 'vods/serial';
      case 'EPISODE':
        return 'vods';
      case 'PROGRAMME':
        return 'lives/programmes';
      default:
        return 'vods';
    }
  }

  useEffect(() => {
    dispatch(getSelectedMovieData({ movieId: movieId || '', movieType: typeToLink(movieType)}))
  }, [])

  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const player = new redGalaxy.Player(playerRef.current).setup({
      file: {
        dash: "//r.dcs.redcdn.pl/dash/o2/web/test/video/big_buck_bunny/encrypted/Manifest.ism",
        ss: "//r.dcs.redcdn.pl/ss/o2/web/test/video/big_buck_bunny/encrypted/Manifest.ism/manifest",
        hls: "//r.dcs.redcdn.pl/hls/o2/portal/prod/vod/big_buck_bunny/movie/hls/playlist.smil/playlist.m3u8"
      },
      drm: {
        widevine: "//ls-proxy.redlabs.pl/license/wvpl?key=A4E78513B96F6CEC3C09B2CDF354A240",
        playready: "//ls-proxy.redlabs.pl/license/playready?key=A4E78513B96F6CEC3C09B2CDF354A240",
        fairplay: {
          src: "//ls-proxy.redlabs.pl/license/fps/tvnTest/fps/tvnTest?key=F5756A0066EB2DCA468767C55D71E65E&iv=7AF9BF4AD64243659CF3D3944851EA43",
          cert: "//r.dcs.redcdn.pl/file/o2/portal/prod/fairplay/cert.pub"
        }
      },
      width: "100%",
      height: "100%",
      autoplayBlockedRule: "mute",
      keyboardEvents: true,
      liveDelay: 25,
      playsInline: true,
      stripe: {
        url: "//r.dcs.redcdn.pl/http/o2/portal/prod/vod/big_buck_bunny/stripes/stripe_{index}.jpg",
        interval: 2,
        count: 16,
        width: 160,
        height: 90
      }
    });
  }, []);

  return <div id="player" ref={playerRef} />;

  // return (
  // <div className='movie_container'>
  //   <div>
  //     <img 
  //       style={{
  //         width: '100%',
  //         objectFit: 'contain',
  //       }}
  //       src={'https:' + movieDetails?.images['16x9'][0].url || ''}
  //       alt="new"
  //     />
  //     <div className="description_container">
  //       <div className="movie_title">{movieDetails?.title}</div>
  //       <div className="short_info_container">
  //         <div className="short_info_field">{movieDetails?.year} |</div>
  //         <div className="short_info_field">{movieDetails?.countries?.map((country: { name: string }) => country.name + ' ')}|</div>
  //         <div className="short_info_field">{movieDetails?.production?.name} |</div>
  //         <div className="short_info_field">{movieDetails?.genres?.map((genre: { name: string }) => genre.name + ' ')}|</div>
  //         <div className="short_info_field">{movieDetails?.duration}m</div>
  //       </div>
  //       <div className="movie_description">{movieDetails?.lead}</div>
  //       <div className="bottom_fields">
  //         <div className="short_info_field">Director: {movieDetails?.persons?.DIRECTOR?.map((director: { name: string }) => director.name + ' ')}</div>
  //         <div className="short_info_field">Tags: {movieDetails?.tags.map((tag: { name: string }) => tag.name + ' ')}</div>
  //       </div>
  //     </div>
  //   </div>
  //   <div className="bottom_filler"/>
  // </div>
  // )
}

export default MovieDetails