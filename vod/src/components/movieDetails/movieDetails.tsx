import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../..";
import { DataApi } from "../../api/dataApi/DataApi";
import { getSelectedMovieDataSelector } from "../../store/movieDataReducer/movieDataReducer.selectors";
import { getSelectedMovieData } from "../../store/movieDataReducer/movieDataReducer.thunks";
import "./movieDetails.css";

const MovieDetails = () => {
  const { movieId, movieType } = useParams()
  const dispatch = useAppDispatch()
  const [ isPlayerLoaded, setIsPlayerLoaded ] = useState(false)
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
    const script = document.createElement("script");
    script.src = "//r.dcs.redcdn.pl/file/o2/web/player/redcdn/2.33.0/js/redgalaxy-player-2.33.0.min.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      DataApi.getTrailerData({movieId: movieId || ''}).then((response) => {
        const player = new window.redGalaxy.Player("player").setup({
          file: {
            dash: response.data.sources.DASH[0].src,
            hls: response.data.sources.HLS[0].src
          },
          drm: {
            widevine: response.data.drm.WIDEVINE.src,
            playready: response.data.drm.PLAYREADY.src,
            fairplay: {
              src: response.data.drm.FAIRPLAY.src,
              cert: response.data.drm.FAIRPLAY.cert,
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
        setIsPlayerLoaded(true)
      })
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [])

  return (
  <div className='movie_container'>
    <div>
      <img 
          style={{
            width: window.innerWidth,
            objectFit: 'contain',
          }}
          src={'https:' + movieDetails?.images['16x9'][0].url || ''}
          alt="new"
        />
      <div className="description_container">
        <div className="movie_title">{movieDetails?.title}</div>
        <div className="short_info_container">
          <div className="short_info_field">{movieDetails?.year} |</div>
          <div className="short_info_field">{movieDetails?.countries?.map((country: { name: string }) => country.name + ' ')}|</div>
          <div className="short_info_field">{movieDetails?.production?.name} |</div>
          <div className="short_info_field">{movieDetails?.genres?.map((genre: { name: string }) => genre.name + ' ')}|</div>
          <div className="short_info_field">{movieDetails?.duration}m</div>
        </div>
        <div className="movie_description">{movieDetails?.lead}</div>
        <div className="bottom_fields">
          <div className="short_info_field">Director: {movieDetails?.persons?.DIRECTOR?.map((director: { name: string }) => director.name + ' ')}</div>
          <div className="short_info_field">Tags: {movieDetails?.tags.map((tag: { name: string }) => tag.name + ' ')}</div>
        </div>
      </div>
    </div>
    {movieDetails?.trailer && isPlayerLoaded &&
        <div id='player'></div>
      }
    <div className="bottom_filler"/>
  </div>
  )
}

export default MovieDetails