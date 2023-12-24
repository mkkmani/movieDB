import React from 'react'

const InputContext = React.createContext({
  userInput: '',
  searchInput: '',
  onChangeInput: () => {},
  onEnter: () => {},
  onClickSearch: () => {},
  onClickTitle: () => {},
  onClickSearchHome: () => {},
})

export default InputContext
