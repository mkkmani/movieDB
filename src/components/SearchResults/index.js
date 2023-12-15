import './index.css'
import {useContext, useEffect, useState} from 'react'
import InputContext from '../../context/context'

const SearchResults = () => {
  const [currentPage, changePage] = useState(1)
  const {searchInput} = useContext(InputContext)
  const [searchedData, setSearchedData] = useState()
  console.log('searched data', searchedData)

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = 'e9ec2ea7225ad8a96148d8b293353054'
      const api = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=${currentPage}`
      const options = {
        method: 'GET',
      }
      const response = await fetch(api, options)
      const data = await response.json()
      console.log('searched response', data)
      setSearchedData(data)
    }

    fetchData()
  }, [searchInput, currentPage])

  return <h1>Search results</h1>
}

export default SearchResults
