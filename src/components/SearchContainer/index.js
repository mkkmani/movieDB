import {useContext} from 'react'
import InputContext from '../../context/context'
import './index.css'

const SearchCard = () => {
  const {userInput, onChangeInput, onEnter, onClickSearch} = useContext(
    InputContext,
  )

  return (
    <div className="search-card-container">
      <input
        type="search"
        value={userInput}
        onChange={e => onChangeInput(e.targe.value)}
        onKeyDown={e => onEnter(e.key)}
      />
      <button type="button" onClick={onClickSearch} className="search-card-btn">
        Search
      </button>
    </div>
  )
}

export default SearchCard
