import React from 'react'

const InputContext = React.createContext({
  userInput: '',
  searchInput: '',
  onChangeInput: () => {},
  onkeyDown: () => {},
  onClickSearch: () => {},
  onClickTitle: () => {},
})

export default InputContext
