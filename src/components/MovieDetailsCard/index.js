import './index.css'
import Loading from '../Loader'
import CastCard from '../CastCrewCard'

const MovieDetailsCard = props => {
  const {movieDetails, castDetails} = props
  const {
    backdropPath,
    posterPath,
    title,
    releaseDate,
    voteAverage,
    genres,
    overview,
    runtime,
    tagline,
    revenue,
    budget,
    voteCount,
    status,
  } = movieDetails

  const {cast, crew} = castDetails

  if (!movieDetails || Object.keys(movieDetails).length === 0) {
    return <Loading />
  }

  if (!castDetails || Object.keys(castDetails).length === 0) {
    return <Loading />
  }

  const imagePath = 'https://image.tmdb.org/t/p/original'
  const bgImage = `${imagePath}${backdropPath}`
  const posterImage = `${imagePath}${posterPath}`
  const year = new Date(releaseDate).getFullYear()
  const rating = Math.floor(voteAverage * 10)
  const duration = `${Math.floor(runtime / 60)}h${runtime % 60}m`
  const finalBudget = budget > 0 ? budget : '-'
  const finalRevenue = revenue > 0 ? revenue : '-'

  return (
    <div className="movie">
      <div
        className="movie-background"
        style={{backgroundImage: `url(${bgImage})`}}
      >
        <div className="movie-details">
          <div className="poster-div">
            <img src={posterImage} alt={title} className="poster-image" />
          </div>
          <div className="details-div">
            <h1>
              {`${title}`}
              <span className="span-year">({year})</span>
            </h1>
            <div className="ul-movie">
              <div className="gap">
                <span>
                  {releaseDate}
                  {genres.map(each => (
                    <span key={each.id}>{` ${each.name}`}</span>
                  ))}
                </span>
                <span>{` ${duration}`}</span>
              </div>
              <div className="voting-div">
                <div className="details-rating-div">
                  <p>{`${rating}%`}</p>
                </div>
                <p>
                  User
                  <br /> score
                </p>
              </div>
              <div className="gap">
                <p className="tagline">{tagline}</p>
              </div>
              <div className="gap">
                <p className="overview-head">Overview</p>
              </div>
              <div className="gap">
                <p className="overview-content">{overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cast-crew-status">
        <div className="cast-crew">
          <div className="cast-div">
            <p className="cast-heading">Cast</p>
            <ul className="cast-ul">
              {cast.map(eachCast => (
                <li key={eachCast.castId}>
                  <CastCard details={eachCast} />
                </li>
              ))}
            </ul>
            <p className="cast-heading">Crew</p>
            <ul className="cast-ul">
              {crew.map(each => (
                <li key={each.creditId}>
                  <CastCard details={each} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="status-container">
          <div>
            <p className="status-heading">Movie title</p>
            <p className="status-status">{title}</p>
          </div>
          <div>
            <p className="status-heading">Status</p>
            <p className="status-status">{status}</p>
          </div>

          <div>
            <p className="status-heading">Run time</p>
            <p className="status-status">{duration}</p>
          </div>
          <div>
            <p className="status-heading">Budget</p>
            <p className="status-status">
              <span>$</span>
              {finalBudget}
            </p>
          </div>
          <div>
            <p className="status-heading">Revenue</p>
            <p className="status-status">
              <span>$</span>
              {finalRevenue}
            </p>
          </div>
          <div>
            <p className="status-heading">Vote average</p>
            <p className="status-status">{voteAverage}</p>
          </div>
          <div>
            <p className="status-heading">Vote count</p>
            <p className="status-status">{voteCount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailsCard
