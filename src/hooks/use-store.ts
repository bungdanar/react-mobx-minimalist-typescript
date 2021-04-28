import { useContext } from 'react'
import { StoreContext } from '../contexts/store-context'

export const useStore = () => useContext(StoreContext)
