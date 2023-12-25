import {Component} from 'react'
import SearchCard from '../SearchContainer'
import MovieCard from '../MovieCard'
import Loading from '../Loader'
import Failure from '../Failure'
import Pagination from '../Pagination'

const apiStatusList = {
  init: 'INIT',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Upcoming extends Component {
  state = {
    apiStatus: apiStatusList.init,
    data: [],
    currentPage: 1,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const {currentPage} = this.state
    const apiKey = 'e9ec2ea7225ad8a96148d8b293353054'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${currentPage}`

    this.setState({apiStatus: apiStatusList.loading})

    try {
      const response = await fetch(apiUrl)
      const fetchedData = await response.json()

      if (response.ok) {
        const updatedData = fetchedData.results.map(each => ({
          adult: each.adult,
          backdropPath: each.backdrop_path,
          genreIDs: each.genre_ids,
          id: each.id,
          originalLanguage: each.original_language,
          originalTitle: each.original_title,
          overview: each.overview,
          popularity: each.popularity,
          posterPath: each.poster_path,
          releaseDate: each.release_date,
          title: each.title,
          video: each.video,
          voteAverage: each.vote_average,
          voteCount: each.vote_count,
        }))

        this.setState({
          data: updatedData,
          apiStatus: apiStatusList.success,
        })
      } else {
        this.setState({apiStatus: apiStatusList.failure})
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  onChangePage = value => {
    const {currentPage} = this.state
    const updatedPage = currentPage + value

    if (updatedPage < 1) {
      this.setState({currentPage: 1}, this.fetchData)
    } else {
      this.setState({currentPage: updatedPage}, this.fetchData)
    }
  }

  SuccessPage = () => {
    const {data, currentPage} = this.state
    return (
      <div>
        <SearchCard />
        <ul className="home-ul">
          {data.map(each => (
            <li key={each.id}>
              <MovieCard details={each} />
            </li>
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          onChangePage={this.onChangePage}
        />
      </div>
    )
  }

  ReturnPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.loading:
        return <Loading />
      case apiStatusList.success:
        return this.SuccessPage()
      case apiStatusList.failure:
        return <Failure />
      default:
        return null
    }
  }

  render() {
    return this.ReturnPage()
  }
}

export default Upcoming
