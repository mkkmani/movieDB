import './App.css'
import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import HomeRoute from './components/HomeRoute'
import Toprated from './components/TopRated'
import Upcoming from './components/Upcoming'
import Navbar from './components/Navbar'
import MovieDetails from './components/MovieDetails'
import SearchRoute from './components/SearchRoute'
import InputContext from './context/context'

class App extends Component {
  state = {
    userInput: '',
    redirectToSearch: false,
  }

  onChangeUserInput = value => {
    this.setState({userInput: value})
  }

  onClickTitle = () => {
    this.setState({userInput: ''})
  }

  onClickEnter = key => {
    const {userInput} = this.state
    if (key === 'Enter' && userInput !== '') {
      this.setState({
        userInput: '',
        redirectToSearch: true,
      })
    }
  }

  onClickSearch = () => {
    const {userInput} = this.state
    if (userInput !== '') {
      this.setState({
        userInput: '',
        redirectToSearch: true,
      })
    }
  }

  render() {
    const {userInput, redirectToSearch} = this.state
    const contextValue = {
      userInput,
      onChangeInput: this.onChangeUserInput,
      onEnter: this.onClickEnter,
      onClickSearch: this.onClickSearch,
      onClickTitle: this.onClickTitle,
    }

    return (
      <InputContext.Provider value={contextValue}>
        <div className="app-div">
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
            <Route exact path="/search-results" component={SearchRoute} />
          </Switch>
          {redirectToSearch && <Redirect to="/search-results" />}
        </div>
      </InputContext.Provider>
    )
  }
}

export default App
