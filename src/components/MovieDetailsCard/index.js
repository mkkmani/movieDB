import {useContext} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import InputContext from '../../context/context'

const Navbar = () => {
  const {
    userInput,
    onChangeInput,
    onKeyDown,
    onClickSearch,
    onClickTitle,
  } = useContext(InputContext)

  const clickTitle = history => {
    onClickTitle()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-bar">
        <div>
          <h1 className="nav-title" onClick={clickTitle}>
            movieDB
          </h1>
        </div>
        <div>
          <ul className="nav-routes">
            <li>
              <Link to="/" className="nav-link">
                Popular
              </Link>
            </li>
            <li>
              <Link to="/top-rated" className="nav-link">
                Top rated
              </Link>
            </li>
            <li>
              <Link to="/upcoming" className="nav-link">
                Upcoming
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <input
            type="search"
            className="nav-search"
            placeholder="search movies"
            value={userInput}
            onKeyDown={e => onKeyDown(e.key)}
            onChange={e => onChangeInput(e.target.value)}
          />
          <button type="button" className="search-btn" onClick={onClickSearch}>
            Search
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
