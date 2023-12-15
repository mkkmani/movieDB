import {Component} from 'react'
import MovieDetailsCard from '../MovieDetailsCard'
import './index.css'

const apiStatusList = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieDetails extends Component {
  state = {
    apiStatus: 'init',
    movieData: {},
    castDetails: {},
  }

  componentDidMount() {
    this.getMovieData()
    this.getCastDetails()
  }

  getMovieData = async () => {
    this.setState({apiStatus: apiStatusList.loading})

    const {
      match: {
        params: {id},
      },
    } = this.props
    const apiKey = 'e9ec2ea7225ad8a96148d8b293353054'
    const api = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const options = {
      method: 'GET',
    }

    const response = await fetch(api, options)
    const data = await response.json()

    const updatedData = {
      backdropPath: data.backdrop_path,
      belongsToCollection: data.belongs_to_collection,
      budget: data.budget,
      genres: data.genres,
      homepage: data.homepage,
      id: data.id,
      imdbId: data.imdb_id,
      originalLanguage: data.original_language,
      originalTitle: data.original_title,
      overview: data.overview,
      popularity: data.popularity,
      productionsCompanies: data.production_companies,
      productionsCountries: data.production_countries,
      releaseDate: data.release_date,
      revenue: data.revenue,
      runtime: data.runtime,
      status: data.status,
      tagline: data.tagline,
      title: data.title,
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
      spokenLanguages: data.spokenLanguages,
      video: data.video,
      adult: data.adult,
      posterPath: data.poster_path,
    }

    this.setState({movieData: updatedData, apiStatus: apiStatusList.success})
  }

  getCastDetails = async () => {
    const {
      match: {
        params: {id},
      },
    } = this.props
    const apiKey = 'e9ec2ea7225ad8a96148d8b293353054'
    const api = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
    const options = {
      method: 'GET',
    }

    const response = await fetch(api, options)
    const data = await response.json()

    const updatedData = {
      cast: data.cast.map(eachCast => ({
        adult: eachCast.adult,
        castId: eachCast.cast_id,
        character: eachCast.character,
        creditId: eachCast.credit_id,
        id: eachCast.id,
        gender: eachCast.gender,
        knownForDept: eachCast.known_for_department,
        name: eachCast.name,
        order: eachCast.order,
        originalName: eachCast.original_name,
        popularity: eachCast.popularity,
        profilePath: eachCast.profile_path,
      })),
      crew: data.crew.map(eachCrew => ({
        adult: eachCrew.adult,
        creditId: eachCrew.credit_id,
        dept: eachCrew.department,
        gender: eachCrew.gender,
        id: eachCrew.id,
        job: eachCrew.job,
        knownForDept: eachCrew.known_for_department,
        originalName: eachCrew.original_name,
        name: eachCrew.name,
        popularity: eachCrew.popularity,
        profilePath: eachCrew.profile_path,
      })),
    }

    this.setState({
      castDetails: updatedData,
      apiStatus: apiStatusList.success,
    })
  }

  renderPage = () => {
    const {movieData, castDetails} = this.state

    return (
      <MovieDetailsCard movieDetails={movieData} castDetails={castDetails} />
    )
  }

  renderMovieDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.loading:
        return <div>Loading</div>
      case apiStatusList.success:
        return this.renderPage()
      case apiStatusList.failure:
        return <div>Failure</div>

      default:
        return null
    }
  }

  render() {
    return this.renderPage()
  }
}

export default MovieDetails
