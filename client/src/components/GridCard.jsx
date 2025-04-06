import { useState } from 'react'
import React from 'react'
import img from '../images/Logo.png'
import {api_base_url} from '../helper'
import { useNavigate } from 'react-router-dom'

const GridCard = ({item}) => {
  const navigate = useNavigate()

  const [isDeleteModel, setisDeleteModel] = useState(false)
  
  const deleteProj = (id) => {
    fetch(api_base_url + "/deleteProject",{
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projId: id,
        userId: localStorage.getItem("userId")
      })
    }).then(res=>res.json()).then(data=>{
      if(data.success){
        setisDeleteModel(false)
        window.location.reload()
      }else{
        alert(data.message)
        setisDeleteModel(false)
      }
    })
  }
  
  return (
    <>
    <div className=" p-2 gridCard bg-gray-600 cursor-pointer hover:bg-gray-500 w-[200px] h-[200px] rounded-lg shadow-lg shadow-black">
      <div onClick={()=> {navigate(`/editor/${item._id}`)}}>
        <img className='w-[80px] p-2' src={img} alt="NoImg" />
        <h3 className='text-[20px] w-[90%] line-clamp-1'>{item.title}</h3>
        <div className='flex items-center justify-between'>
            <p className='text-[14px] text-gray-400'>Created on {new Date(item.date).toDateString()}</p>
        </div>
        </div>
        <div>
            <button onClick={() => {setisDeleteModel(true)}} className='text-red-500 mt-2 hover:text-red-700 font-semibold bg-transparent border border-red-500 px-3 py-1 ml-1 rounded-md transition-all duration-200'
            >Delete</button> </div> 
    </div>
    {
  isDeleteModel ? 
  <div className='model fixed top-0 left-0 w-screen h-screen bg-transparent flex justify-center items-center flex-col'>
    <div className="mainModel h-[23vh] w-[33vw] bg-gray-800 rounded-lg p-5">
      <h3 className='text-white'>Do you want to <b> Delete </b> this Project ?</h3>
      <div className="flex w-full items-center gap-4">
          <button onClick={() => {deleteProj(item._id)}} className='p-3 m-4 rounded-lg bg-red-600 hover:bg-red-500 text-white cursor-pointer'>Delete</button>
          <button onClick={() => {setisDeleteModel(false)}} className='p-3 m-4 rounded-lg bg-gray-600 hover:bg-gray-400 text-white cursor-pointer'>Cancel</button>
      </div>
    </div>
  </div> : ""

}
    </>
  )
}

export default GridCard
