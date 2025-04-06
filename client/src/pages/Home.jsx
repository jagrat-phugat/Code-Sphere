import React, { useState,useEffect } from 'react'
import NavBar from '../components/NavBar'
import ListCard from '../components/ListCard'
import GridCard from '../components/GridCard'
import {api_base_url} from '../helper'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [isGridLayout, setisGridLayout] = useState(false)
  const [isCreateModel, setisCreateModel] = useState(false)
  const [projTitle, setProjTitle] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [userError, setUserError] = useState("");
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('')

  const navigate = useNavigate();

  const filteredData = data ? data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) // Case insensitive filtering
  ) : [];

  const createProj = (e) => {
    if (projTitle === "") {
      alert("Please Enter Project Title");
    } else {
      fetch(api_base_url + "/createProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projTitle,
          userId: localStorage.getItem("userId")
        })
      }).then(res => res.json()).then(data => {
        if (data.success) {
          setisCreateModel(false);
          setProjTitle("");
          alert("Project Created Successfully");
          navigate(`/editior/${data.projectId}`);
        } else {
          alert("Something Went Wrong");
        }
      });
    }
  };

  const getProj = () => {
    fetch(api_base_url + "/getProjects", {
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
        setData(data.projects);
      } else {
        setError(data.message);
      }
    });
  };

  useEffect(() => {
    getProj();
  }, []);

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
        setUserData(data.user);
      }
      else {
        setUserError(data.message);
      }
    }).catch((err) => {
      setUserError("Failed to fetch User Details!")
    })
  }, [])

  return (
    <>
      <NavBar isGridLayout={isGridLayout} setisGridLayout={setisGridLayout}/>
      <div className="flex items-center justify-between p-4 bg-gray-600">
  <h2 className="text-xl font-semibold">Hii {userData ? userData.name : "No Data Found"}</h2>
  <div className="flex items-center gap-2">
    <div>
      <input value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder="Search Here..."
        className="px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <button onClick={() => {setisCreateModel(true)}} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      +
    </button>
  </div>
</div>

<div className="cards mt-4">
  {isGridLayout ? (
    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {
        filteredData.length>0 ? filteredData.map((item, index) => {
          return <GridCard key={index} item={item}/>
        }) : <p className='text-red-700 items-center justify-between text-[40px]'>No Projects Found!</p>
      }
      
      {/* <GridCard />
      <GridCard />
      <GridCard />
      <GridCard />
      <GridCard /> */}
    </div>
  ) : (
    <div className="space-y-4">
       {
        filteredData.length>0 ? filteredData.map((item, index) => {
          return <ListCard key={index} item={item}/>
        }) : <p className='text-red-700 items-center justify-between text-[40px]'>No Projects Found!</p>
      }

      {/* <ListCard />
      <ListCard />
      <ListCard />
      <ListCard />
      <ListCard />
      <ListCard /> */}
    </div>
  )}
</div>

{
  isCreateModel &&
  <div className='model fixed top-0 left-0 w-screen h-screen bg-transparent flex justify-center items-center flex-col'>
  <div className="mainModel h-[33vh] w-[33vw] bg-gray-800 rounded-lg p-5">
    <h3 className='text-white text-2xl'>Create New Project...</h3>
    <div className='inputBox mt-4 p-2 text-white bg-gray-400 rounded-lg'>
      <input onChange={(e) => {setProjTitle(e.target.value)}}
        value={projTitle}
        type="text" 
        placeholder='Project Title' 
        className='w-full bg-transparent outline-none text-white'
      />
    </div>
    <div className='buttonGroup m-3 p-2 flex justify-end space-x-2'>
      <button onClick={createProj} className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>
        Create
      </button>
      <button onClick={() => {setisCreateModel(false)}} className='bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600'>
        Cancel
      </button>
    </div>
  </div>
</div>
}

    </>
  )
}

export default Home
