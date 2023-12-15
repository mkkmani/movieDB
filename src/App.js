import './App.css'
import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import HomeRoute from './components/HomeRoute'
import Toprated from './components/TopRated'
import Upcoming from './components/Upcoming'
import Navbar from './components/Navbar'
import MovieDetails from './components/MovieDetails'
import InputContext from './context/context'

class App extends Component {
  state = {
    userInput: '',
    setUserInput: '',
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
    // console.log(key)
    if (key === 'Enter') {
      this.setState({setUserInput: userInput, userInput: ''})
    }
  }

  onClickSearch = () => {
    const {userInput} = this.state
    this.setState({setUserInput: userInput, userInput: ''})
    // console.log('search btn clicked')
  }

  render() {
    const {userInput, setUserInput} = this.state
    const contextValue = {
      userInput,
      searchInput: setUserInput,
      onChangeInput: this.onChangeUserInput,
      onEnter: this.onClickEnter,
      onClickSearch: this.onClickSearch,
      onClickTitle: this.onClickTitle,
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
          </Switch>
        </div>
      </InputContext.Provider>
    )
  }
}

export default App
