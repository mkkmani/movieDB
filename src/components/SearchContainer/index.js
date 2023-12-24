import {useContext, useState} from 'react'
import InputContext from '../../context/context'
import './index.css'

const SearchCard = () => {
  const [userInput, setInput] = useState('')
  const {onEnter, onClickSearchHome} = useContext(InputContext)

  return (
    <div className="search-container-card">
      <input
        type="search"
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => onEnter(e.key)}
        className="search-home"
        value={userInput}
      />
      <button
        type="button"
        onClick={() => onClickSearchHome(userInput)}
        className="search-card-btn"
      >
        Search
      </button>
    </div>
  )
}

export default SearchCard
