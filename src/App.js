import './App.css'
import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import HomeRoute from './components/HomeRoute'
import Navbar from './components/Navbar'

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

  onKeyDown = key => {
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
    const {setUserInput, userInput} = this.state
    const HomeRouteComponent = () => <HomeRoute searchInput={setUserInput} />
    return (
      <div>
        <Navbar
          onChangeUserInput={this.onChangeUserInput}
          onKeyDown={this.onKeyDown}
          onClickSearch={this.onClickSearch}
          searchInput={userInput}
          onClickTitle={this.onClickTitle}
        />
        <Switch>
          <Route exact path="/" component={HomeRouteComponent} />
        </Switch>
      </div>
    )
  }
}

export default App
