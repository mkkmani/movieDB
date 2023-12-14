import './index.css'
import {Link} from 'react-router-dom'

const Failure = () => (
  <div className="failure-container">
    <h1>Something went wrong in getting the data</h1>
    <Link to="/" className="link-item">
      <button type="button" className="failure-btn">
        Home
      </button>
    </Link>
  </div>
)

export default Failure
