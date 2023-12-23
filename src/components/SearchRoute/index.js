import './index.css'
import {useEffect, useContext, useState} from 'react'
import Loading from '../Loader'
import Failure from '../Failure'
import InputContext from '../../context/context'
import SearchCard from '../SearchCard'

const apiStatusList = {
  init: 'INIT',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const SearchRoute = () => {
  const {searchInput} = useContext(InputContext)
  const [data, setData] = useState()
  const [apiStatus, setStatus] = useState(apiStatusList.init)
  const [page, updatePage] = useState(1)

  const searchQuery = searchInput.charAt(0).toUpperCase() + searchInput.slice(1)

  useEffect(() => {
    const fetchData = async () => {
      setStatus(apiStatusList.loading)
      const apiKey = 'e9ec2ea7225ad8a96148d8b293353054'
      const api = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=${page}`
      const options = {
        method: 'GET',
      }
      const response = await fetch(api, options)
      const fetchedData = await response.json()
      console.log('fetched data', fetchedData)
      if (response.ok) {
        const updatedData = fetchedData.results.map(each => ({
          backDropPath: each.backdrop_path,
          id: each.id,
          originalLanguage: each.original_language,
          originalTitle: each.original_title,
          overview: each.overview,
          title: each.title,
          releaseDate: each.release_date,
          popularity: each.popularity,
          posterPath: each.poster_path,
          voteCount: each.vote_count,
          voteAverage: each.vote_average,
        }))

        setData(updatedData)
        setStatus(apiStatusList.success)
      } else {
        setStatus(apiStatusList.failure)
      }
    }

    fetchData()
  }, [searchInput, page])

  const changePage = value => {
    const updatedPage = page + value
    if (page < 1) {
      updatePage(1)
    }
    updatePage(updatedPage)
  }

  const Pagination = () => (
    <div className="pagination-container">
      <button
        type="button"
        className="page-btn"
        onClick={() => {
          changePage(-1)
        }}
      >
        Prev
      </button>
      <span>{page}</span>
      <button
        type="button"
        className="page-btn"
        onClick={() => {
          changePage(1)
        }}
      >
        Next
      </button>
    </div>
  )

  if (!data || data.length === 0) {
    return <h1>Modify your search or search movie title to get results</h1>
  }

  const SuccessView = () => (
    <div className="search-results-container">
      <h1 className="your-search">{`Your search: ${searchQuery}`}</h1>
      <ul className="search-results-ul">
        {data.map(each => (
          <li key={each.id}>
            <SearchCard details={each} />
          </li>
        ))}
      </ul>
      <Pagination />
    </div>
  )

  const ReturnPage = () => {
    switch (apiStatus) {
      case apiStatusList.success:
        return <SuccessView />
      case apiStatusList.failure:
        return <Failure />
      case apiStatusList.loading:
        return <Loading />
      default:
        return null
    }
  }

  return <ReturnPage />
}

export default SearchRoute
