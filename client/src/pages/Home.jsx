import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import ListCard from '../components/ListCard';
import GridCard from '../components/GridCard';
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';
import {bgImageHome} from '../images/bgImageHome.jpg';

const Home = () => {
  const [isGridLayout, setisGridLayout] = useState(false);
  const [isCreateModel, setisCreateModel] = useState(false);
  const [projTitle, setProjTitle] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [userError, setUserError] = useState("");
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const filteredData = data ? data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
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
      } else {
        setUserError(data.message);
      }
    }).catch(() => {
      setUserError("Failed to fetch User Details!");
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImageHome})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="relative z-10">
        <NavBar isGridLayout={isGridLayout} setisGridLayout={setisGridLayout} />

        <div className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-70 rounded-md mx-4 mt-4 shadow-lg">
          <h2 className="text-2xl font-bold text-white">Hi {userData ? userData.name : "User"}</h2>
          <div className="flex items-center gap-3">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search Projects..."
              className="px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-800"
            />
            <button
              onClick={() => setisCreateModel(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xl"
            >
              +
            </button>
          </div>
        </div>

        <div className="cards mt-6 px-4">
          {isGridLayout ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => <GridCard key={index} item={item} />)
              ) : (
                <p className="text-red-500 text-2xl font-semibold text-center col-span-3">No Projects Found!</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => <ListCard key={index} item={item} />)
              ) : (
                <p className="text-red-500 text-2xl font-semibold text-center">No Projects Found!</p>
              )}
            </div>
          )}
        </div>

        {isCreateModel && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-20">
            <div className="bg-white w-[90%] md:w-[40%] p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800">Create New Project</h3>
              <input
                onChange={(e) => setProjTitle(e.target.value)}
                value={projTitle}
                type="text"
                placeholder="Project Title"
                className="mt-4 w-full px-4 py-2 rounded-md border outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end mt-4 space-x-3">
                <button
                  onClick={createProj}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Create
                </button>
                <button
                  onClick={() => setisCreateModel(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
