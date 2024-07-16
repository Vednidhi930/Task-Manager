import React, { useState } from "react";
import { MdOutlineAllInclusive } from "react-icons/md";
import { IoMdCloudDone } from "react-icons/io";
import { MdIncompleteCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = ({ handleClick, user }) => {

  // const uploadFile=document.getElementById("uploadFile")
  // const submitButton=document.getElementById("submit")



  // document.getElementById("maindiv").addEventListener("click",()=>{
  //   document.getElementById("uploadFile").click()
  // })

const handleImage=()=>{
  document.getElementById("uploadFile").click()
}


  


  const[profile,setProfile]=useState("")

  const handleProfile=(e)=>{
    const file=e.target.files[0]
    if(file){

    }
   const name=e.target.name
   const value=e.target.value
   console.log(name)
  //  setProfile(name=value)
  }

 const[time,setTime]=useState(new Date().toLocaleTimeString())

 const updateTime=()=>{
  const currentTime=new Date().toLocaleTimeString()
  setTime(currentTime)
 }

 setInterval(updateTime,1000)

  const data = [
    {
      category: "All Task",
      icon: <MdOutlineAllInclusive className="text-2xl text-purple-500" />,
      link: "/",
    },
    {
      category: "Completed",
      icon: <IoMdCloudDone className="text-2xl text-green-500" />,
      link: "/completedTask",
    },
    {
      category: "InCompleted",
      icon: <MdIncompleteCircle className="text-2xl text-red-600" />,
      link: "incompletedTask",
    },
  ];
  return (
    <>
      <nav className="flex ">
        <motion.div initial={{x:-600,opacity:0}} animate={{x:0,opacity:1}} transition={{ease:"easeInOut",duration:0.6} } style={{backgroundColor:"rgba(245, 246, 250,1.0)"}} className="w-64 h-[100vh]  border flex rounded-lg flex-col gap-10 border-black">
          <div className="w-full h-16 border-b flex justify-center items-center border-black">
            <h1 className="text-[1.2rem] uppercase ">Task Manager</h1>
            <button
              className="border border-black ps-2 pr-2  h-8 ms-10 font-mono bg-red-400 text-sm text-white rounded-full font-bold"
              onClick={handleClick}
            >
              Logout
            </button>
          </div>

          <div className="w-full flex justify-center">
            <h1 className="ms-2 text-lg text-red-500">{time}</h1>
          </div>

          <div className="w-full h-40 flex flex-col gap-1 justify-center items-center border-black">
            <div
             onClick={handleImage}
            className="w-16 overflow-hidden h-16 rounded-full border border-black flex justify-center items-center">
              <img
                className=""
                src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-sm font- flex justify-center font-sans text-wrap">
                {user.email}
              </p>
            </div>
          </div>

           <div className="w-full h-32 flex flex-col gap-6 cursor-pointer">
            {data.map((curr, i) => (
             < NavLink to={curr.link}><div
                  key={i}
                  className="w-full flex flex-col items-center justify-center gap-2"
                >
                  {curr.icon}
                  <h1>{curr.category}</h1>
                </div></NavLink>
            ))}
          </div>
        </motion.div>
      </nav>

      <form encType="multipart/form-data" hidden id="submit">
        <input type="file" id="uploadFile" name="profile" onChange={handleProfile}/>
      </form>
    </>
  );
};

export default Sidebar;
