import React from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";

const Nav = () => {

    const navigate = useNavigate()
    const onLogoutUser = () => {
        const token = localStorage.getItem('token')

        axios.delete('/api/logout', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                    delete localStorage.removeItem('token')
                    navigate('/login')
                }
            )
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <nav
            className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <NavLink to="/" className="flex items-center">
                        <span
                            className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            Logo
                        </span>
                </NavLink>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                     id="navbar-sticky">
                    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <NavLink
                                to="/"
                                className={({isActive}) => isActive ? 'text-blue-700' :
                                    'block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}
                                aria-current="page">Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/posts/create"
                                className={({isActive}) => isActive ? 'text-blue-700' :
                                    'block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                }
                            >
                                New Post
                            </NavLink>
                        </li>
                        <li>
                            <button
                                className='block py-2 pl-3 pr-4  text-red-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                aria-current="page"
                                onClick={onLogoutUser}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
