import React from 'react'

const SelectContext = React.createContext([""])

export const SelectProvider = SelectContext.Provider
export const SelectConsumer = SelectContext.Consumer
export default SelectContext