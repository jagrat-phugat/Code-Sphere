import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'react-avatar'
import { MdGridOn } from 'react-icons/md'
import { toggleClass } from '../helper'
import { IoMdCodeDownload } from "react-icons/io";

const EditorNavbar = () => {
  return (
    <>
    <div className="EditorNavbar flex justify-between items-center px-6 py-4 bg-black text-white">
  <div className="logo">
    <img src="https://www.docker.com/wp-content/uploads/2023/05/ide_3@2x.png" alt="NoImg" className="h-10 w-10" />
  </div>
    <p> File / <span className='text-gray-400'> My First Project </span> </p>
    <i className='p-3 bg-gray-800 rounded cursor-pointer'> <IoMdCodeDownload /></i>
    </div>
    </>
  )
}

export default EditorNavbar
