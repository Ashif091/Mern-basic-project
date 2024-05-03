import React, {useEffect, useRef, useState} from "react"
import {Toaster, toast} from "sonner"
import {MdDelete} from "react-icons/md"
const UserData = () => {
  const [data, setData] = useState<any>(null)
  const [searchData, setSearchData] = useState<any>("")

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false)

  const handleChange = (e: any) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const searchDataAction = (e: any) => {
    setSearchData(e.target.value.trim())
  }
  useEffect(() => {
    fetch(`/api/admin/users?Qdata=${searchData}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error))
  }, [searchData])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      setError(false)
      const res = await fetch("/api/admin/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data?.error) {
        setError(true)
        toast(<h1 className="text-red-400 text-sm">{data.error}</h1>)
        return
      }
      setData(data)
      toast(
        <h1 className="text-green-500 text-sm">New user successfully added </h1>
      )
      console.log(data)
    } catch (error) {
      setError(true)
    }
  }

  const removeUser = async (id: any) => {
    try {
      setError(false)
      const res = await fetch(`/api/admin/remove-user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      if (data?.error) {
        setError(true)
        toast(<h1 className="text-red-400 text-sm">{data.error}</h1>)
        return
      }
      setData(data)
      toast(
        <h1 className="text-green-500 text-sm">User successfully Deleted </h1>
      )
    } catch (error: any) {
      toast(<h1 className="text-red-400 text-sm">{error}</h1>)

      setError(true)
    }
  }

  const blockUser = async (id: any) => {
    try {
      setError(false)
      const res = await fetch(`/api/admin/block-user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      if (data?.error) {
        setError(true)
        toast(<h1 className="text-red-400 text-sm">{data.error}</h1>)
        return
      }
      setData(data)
      toast(
        <h1 className="text-green-500 text-sm">User successfully Updated </h1>
      )
    } catch (error: any) {
      toast(<h1 className="text-red-400 text-sm">{error}</h1>)

      setError(true)
    }
  }

  return (
    <div className="w-full h text-4xl flex gap-0 ">
      <Toaster position="bottom-left" />
      {/* right add form  */}

      <form
        onSubmit={handleSubmit}
        className="max-w-sm max-h-52 mx-auto border border-gray-600 mt-20 pt-2 px-10 rounded-md items-center text-center bg-gray-700/30  shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]"
      >
        <h1 className="text-xl mb-2 text-gray-400">New User</h1>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </span>
          <input
            onChange={handleChange}
            placeholder="Username"
            id="username"
            type="text"
            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {/* email */}
        <div className="relative mt-4">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>
          <input
            onChange={handleChange}
            type="email"
            placeholder="Email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-12 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          ADD
        </button>
      </form>

      {/*  */}
      <div className="m-auto mt-12  text-wrap">
        {/* search bar  */}

        <form className="flex items-center max-w-sm mx-auto mb-8">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                />
              </svg>
            </div>
            <input
              type="text"
              onChange={searchDataAction}
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search user name or mail..."
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>

        {/* ____________ */}
        <ul className="min-w-[40rem] divide-y divide-gray-200 dark:divide-gray-700 h-[15rem] overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
          {data ? (
            data.map((user: any, index: number) => (
              <li className="pb-3 sm:pb-4" key={index}>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user.profilePicture}
                      alt="Neil image"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {user.username}
                    </p>
                    <p className="text-sm text-gray-200 truncate ">
                      {user.email}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold cursor-pointer  dark:text-white pr-7">
                    <button
                      type="button"
                      onClick={() => {
                        blockUser(user._id)
                      }}
                      className="text-gray-500 mr-4 mt-3 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1 mb-2 dark:bg-gray-500 dark:text-white dark:border-gray-400 dark:hover:bg-gray-600 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      {user.userStatus ? "Active" : "Blocked"}
                    </button>
                    <MdDelete
                      size={18}
                      onClick={() => {
                        removeUser(user._id)
                      }}
                    />
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="flex  items-center mt-4 animate-pulse justify-between">
              <div className="flex items-center mt-4 animate-pulse">
                <svg
                  className="w-10 h-10 me-3 text-gray-200 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-704 w-32 mb-2"></div>
                  <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                </div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default UserData
