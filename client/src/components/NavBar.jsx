import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { unAuthUser } from '../redux/actionCreators/userAC';
import busImg from '../pictures/busSmall.png'

function NavBar() {

  const { auth } = useSelector(state => state.userReducer)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  const toggle = () => setIsOpen(!isOpen)

  const logout = async (event) => {
    event.preventDefault()
    localStorage.removeItem('auth_token')
    return dispatch(unAuthUser())
  }

  return (
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex">
            <img src={busImg} alt="/" className="h-8 mr-4"/>
            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">BusTracker</span>
          </Link>
          <button onClick={toggle} type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="mobile-menu-2" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
          <div onClick={toggle} className={(isOpen) ? "w-full md:block md:w-auto" : "hidden w-full md:block md:w-auto"} id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link to="/" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Домой</Link>
              </li>
              {(auth) ?
                < li >
                  <span onClick={logout} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Выйти</span>
                </li>
                :
                <>
                  <li>
                    <Link to="/login" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Войти</Link>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default NavBar;
