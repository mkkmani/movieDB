import {Link, withRouter} from 'react-router-dom'
import {useContext} from 'react'
import InputContext from '../../context/context'
import './index.css'

const Navbar = props => {
  const {
    userInput,
    onChangeInput,
    onEnter,
    onClickSearch,
    onClickTitle,
  } = useContext(InputContext)

  const clickTitle = () => {
    const {history} = props
    onClickTitle()
    history.push('/')
  }
  return (
    <nav>
      <div className="nav-bar">
        <div>
          <h1 className="nav-title" onClick={() => clickTitle()}>
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
                Top Rated
              </Link>
            </li>
            <li>
              <Link to="upcoming" className="nav-link">
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
            onKeyDown={e => onEnter(e.key)}
            onChange={e => {
              onChangeInput(e.target.value)
            }}
          />
          <button
            type="button"
            className="search-btn"
            onClick={() => onClickSearch()}
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
