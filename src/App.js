import './App.css'
import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import HomeRoute from './components/HomeRoute'
import Toprated from './components/TopRated'
import Upcoming from './components/Upcoming'
import Navbar from './components/Navbar'
import MovieDetails from './components/MovieDetails'
import SearchResults from './components/SearchResults'
import InputContext from './context/context'

class App extends Component {
  state = {
    userInput: '',
    setUserInput: '',
    redirectToSearch: false,
  }

  onChangeUserInput = value => {
    this.setState({userInput: value})
    // console.log(value)
  }

  onClickTitle = () => {
    this.setState({setUserInput: ''})
  }

  onClickEnter = key => {
    const {userInput} = this.state
    if (key === 'Enter' && userInput !== '') {
      this.setState({
        setUserInput: userInput,
        userInput: '',
        redirectToSearch: true,
      })
    }
  }

  onClickSearch = () => {
    const {userInput} = this.state
    if (userInput !== '') {
      this.setState({
        setUserInput: userInput,
        userInput: '',
        redirectToSearch: true,
      })
    }
  }

  render() {
    const {userInput, setUserInput, redirectToSearch} = this.state
    const contextValue = {
      userInput,
      searchInput: setUserInput,
      onChangeInput: this.onChangeUserInput,
      onEnter: this.onClickEnter,
      onClickSearch: this.onClickSearch,
      onClickTitle: this.onClickTitle,
    }

    if (redirectToSearch) {
      return <Redirect to="/search-results" />
    }
    return (
      <InputContext.Provider value={contextValue}>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomeRoute} />
            <Route exact path="/top-rated" component={Toprated} />
            <Route exact path="/upcoming" component={Upcoming} />
            <Route
              exact
              path="/movie/:movieName/:id"
              component={MovieDetails}
            />
            <Route exact path="/search-results" component={SearchResults} />
          </Switch>
        </div>
      </InputContext.Provider>
    )
  }
}

export default App
