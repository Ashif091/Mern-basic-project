import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import type { RootState }from '../redux/store'; 

export default function PrivateRoute() {
    const {currentUser} = useSelector((state:any)=> state.user)
  return currentUser?.admin? <Outlet/> : <Navigate to='/admin-sign-in'/>
} 