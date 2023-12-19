import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {details} = props
  const {title, id, posterPath, releaseDate, voteAverage} = details

  const formatDate = inputDate =>
    new Date(inputDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })

  const formattedDate = formatDate(releaseDate)

  return (
    <div className="movie-card-container">
      <div className="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/original/${posterPath}`}
          alt={title}
          className="poster-img"
        />
        <div className="rating-div">
          <p className="rating-text">{voteAverage}</p>
        </div>
        <p className="popular-title">{title}</p>
        <p className="popular-date">{formattedDate}</p>
      </div>
      <div className="details-btn-div">
        <Link to={`/movie/${title}/${id}`} className="link-item">
          <button type="button" className="details-btn">
            View Details
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MovieCard
