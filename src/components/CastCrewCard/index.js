import './index.css'

const CastCard = props => {
  const {details} = props
  const imagePath = 'https://image.tmdb.org/t/p/original'
  const {character, originalName, profilePath, job} = details
  const imageSrc =
    profilePath !== null
      ? `${imagePath}${profilePath}`
      : 'https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png'

  return (
    <div className="cast-container">
      <div className="cast-card">
        <img className="cast-img" src={imageSrc} alt={originalName} />
      </div>
      <div className="cast-details">
        <p className="cast-name">{originalName}</p>
        <p className="cast-character">{character}</p>
        <p className="cast-character">{job}</p>
      </div>
    </div>
  )
}

export default CastCard
