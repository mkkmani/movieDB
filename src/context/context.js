import React from 'react'

const InputContext = React.createContext({
  userInput: '',
  searchInput: '',
  onChangeInput: () => {},
  onEnter: () => {},
  onClickSearch: () => {},
  onClickTitle: () => {},
})

export default InputContext
