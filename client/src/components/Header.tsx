import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import {IoIosLogOut} from "react-icons/io"
import {useDispatch} from "react-redux"
import {signOut} from "../redux/user/userSlice"
export default function Header() {
  const {currentUser} = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout")
      dispatch(signOut())
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="bg-slate-600">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">
            {" "}
            {currentUser?.admin ? "Admin" : "Mern App"}
          </h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          {currentUser?.admin ? (
            <Link to="/user-management">
              <li>User management</li>
            </Link>
          ) : (
            <Link to="/about">
              <li>About</li>
            </Link>
          )}

          {currentUser?.admin ? (
            <h1 className="flex gap-2 items-center ">
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="cursor-pointer">
                <IoIosLogOut onClick={handleSignOut} />
              </span>
            </h1>
          ) : (
            <Link to="/profile">
              {currentUser ? (
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <li>Sign In</li>
              )}
            </Link>
          )}
        </ul>
      </div>
    </div>
  )
}
