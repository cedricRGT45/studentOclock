import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../store'

export const useAppDispatch = useDispatch.withTypes<appDispatch>