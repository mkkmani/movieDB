import {useState, useEffect} from 'react'
import MovieCard from '../MovieCard'
import Loading from '../Loader'
import Failure from '../Failure'
// import SearchCard from '../SearchContainer'

const apiStatusList = {
  init: 'INIT',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Toprated = () => {
  const apiKey = 'e9ec2ea7225ad8a96148d8b293353054'
  const [apiStatus, setApiStatus] = useState(apiStatusList.init)
  const [data, setData] = useState()
  const [currentPage, changePage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      setApiStatus(apiStatusList.loading)
      const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${currentPage}`

      const options = {method: 'GET'}
      const response = await fetch(apiUrl, options)
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

        setData(updatedData)
        setApiStatus(apiStatusList.success)
      } else {
        setApiStatus(apiStatusList.failure)
      }
    }

    fetchData()
  }, [currentPage])

  const onChangePage = value => {
    const updatedPage = currentPage + value

    if (updatedPage < 0) {
      changePage(1)
    }
    changePage(updatedPage)
  }

  const Pagination = () => (
    <div className="pagination-container">
      <button
        type="button"
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => {
          onChangePage(-1)
        }}
      >
        Prev
      </button>
      <span className="page-number">{currentPage}</span>
      <button
        type="button"
        className="page-btn"
        disabled={data.length < 20}
        onClick={() => {
          onChangePage(1)
        }}
      >
        Next
      </button>
    </div>
  )

  const SuccessPage = () =>
    data ? (
      <div>
        {/* <SearchCard /> */}
        <ul className="home-ul">
          {data.map(each => (
            <MovieCard key={each.id} details={each} />
          ))}
        </ul>
        <Pagination />
      </div>
    ) : (
      <div>
        <Loading />
      </div>
    )

  const ReturnPage = () => {
    switch (apiStatus) {
      case apiStatusList.loading:
        return <Loading />
      case apiStatusList.success:
        return <SuccessPage />
      case apiStatusList.failure:
        return <Failure />
      default:
        return null
    }
  }

  return <ReturnPage />
}

export default Toprated
