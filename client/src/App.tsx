import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SingIn"
import SignUp from "./pages/SingUp"
import Profile from "./pages/Profile"
import AdminSingIn from "./pages/AdminSingIn"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import AdminRoute from "./components/AdminRoute"
import UserData from "./pages/UserData"
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin-sign-in" element={<AdminSingIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
          {/* -admin area- */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<UserData />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
