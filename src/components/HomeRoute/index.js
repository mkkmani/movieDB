import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'

const apiStatusList = {
  init: 'INIT',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const HomeRoute = props => {
  const {searchInput} = props
  const apiKey = 'e9ec2ea7225ad8a96148d8b293353054'
  const [apiStatus, setApiStatus] = useState(apiStatusList.init)
  const [data, setData] = useState()
  const [currentPage, changePage] = useState(1)
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`
  const [api, setApi] = useState(apiUrl)

  if (searchInput) {
    const searchApi = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=${currentPage}`
    setApi(searchApi)
  }

  useEffect(() => {
    const fetchData = async () => {
      setApiStatus(apiStatusList.loading)
      const options = {method: 'GET'}
      const response = await fetch(api, options)
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
  })

  return <div>Hello</div>
}

export default HomeRoute
