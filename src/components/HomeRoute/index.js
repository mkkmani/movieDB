import {useState, useEffect, useContext} from 'react'
import MovieCard from '../MovieCard'
import Loading from '../Loader'
import Failure from '../Failure'
import InputContext from '../../context/context'
import './index.css'

const apiStatusList = {
  init: 'INIT',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const HomeRoute = () => {
  const {searchInput} = useContext(InputContext)
  const apiKey = 'e9ec2ea7225ad8a96148d8b293353054'
  const [apiStatus, setApiStatus] = useState(apiStatusList.init)
  const [data, setData] = useState()
  const [currentPage, changePage] = useState(1)
  console.log('searchInput', searchInput)
  useEffect(() => {
    const fetchData = async () => {
      setApiStatus(apiStatusList.loading)
      const apiUrl = searchInput
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=${currentPage}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`

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
        console.log('fetchedData', updatedData)
        setApiStatus(apiStatusList.success)
      } else {
        setApiStatus(apiStatusList.failure)
      }
    }

    fetchData()
  }, [searchInput, currentPage])

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
        Previous
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

export default HomeRoute
