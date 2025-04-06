import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar'
import { MdGridOn } from 'react-icons/md'
import { toggleClass, api_base_url } from '../helper'

const NavBar = ({isGridLayout, setisGridLayout}) => {

  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");;

  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setData(data.user);
      }
      else {
        setError(data.message);
      }
    })
  }, [])

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  }

  return (
    <>
    <div className="navbar flex justify-between items-center px-6 py-4 bg-black text-white">
  <div className="logo">
    <img src="https://www.docker.com/wp-content/uploads/2023/05/ide_3@2x.png" alt="NoImg" className="h-10 w-10" />
  </div>
  <div className="links flex space-x-6 items-center">
    <Link to='/' className="hover:text-gray-300">
      Home
    </Link>
    <Link to='/about' className="hover:text-gray-300">
      About
    </Link>
    <Link to='/contact' className="hover:text-gray-300">
      Contact
    </Link>
    <button onClick={logout} className='btnBlue bg-red-700 min-w-[120px] m-2 p-2 rounded-lg hover:bg-red-400'>Logout</button>
    <Avatar onClick={() => {toggleClass(".dropDownNavbar", "hidden")}} name={data ? data.name : ""} size="40" round="50%" className="cursor-pointer border border-black" />
  </div>
  <div className='dropDownNavbar absolute right-[10px] rounded-lg top-[75px] shadow-lg shadow-black bg-gray-400 w-[150px] h-[150px]'>
    <div className='p-5 border-b-[1px] border-b-slate-200'>
      <h3 className='text-[15px]' style={{lineHeight:1}}>{data ? data.name : ""}</h3>
    </div>
    <i onClick={() => setisGridLayout(!isGridLayout)} className='flex items-center p-2 gap-2 mt-2 mb-2 cursor-pointer' style={{fontStyle: "normal"}}> <MdGridOn /> {isGridLayout ? "List" : "Grid"} Layout</i>
  </div>
</div>

    </>
  )
}

export default NavBar
