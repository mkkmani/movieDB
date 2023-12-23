import './index.css'

const SearchCard = props => {
  const {details} = props
  const {
    backDropPath,
    posterPath,
    title,
    releaseDate,
    popularity,
    voteCount,
    voteAverage,
    overview,
  } = details
  const imagePath = 'https://image.tmdb.org/t/p/original'
  const bgImage = `${imagePath}${backDropPath}`
  const image = `${imagePath}${posterPath}`
  const popularityNum = Math.floor(popularity)
  return (
    <div
      className="search-card-container"
      style={{backgroundImage: `url(${bgImage})`}}
    >
      <img src={image} alt={title} className="search-poster-img" />
      <div className="search-card-details">
        <p className="search-card-title">{title}</p>
        <p className="search-card-date">{`Release: ${releaseDate}`}</p>
        <p className="search-card-popularity">
          <span className="search-card-span">
            <span className="search-card-static">Popularity: </span>{' '}
            {`${popularityNum},`}
          </span>
          <span className="search-card-span">
            <span className="search-card-static">Vote count: </span>{' '}
            {`${voteCount},`}
          </span>
          <span className="search-card-span">
            <span className="search-card-static">Vote average: </span>{' '}
            {voteAverage}
          </span>
        </p>
        <p className="search-card-overview-title">Overview</p>
        <p>{overview}</p>
      </div>
    </div>
  )
}

export default SearchCard
