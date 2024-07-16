import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { PiNotePencilBold } from "react-icons/pi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { FcDoNotInsert } from "react-icons/fc";

const IncompletedTask = () => {
  const [incompletedTask, setInCompleteTask] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get("/user/incompletedTasks");
      setInCompleteTask(response.data.taskData.tasks);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCompleteTask = async (id) => {
    const response = await axios.put(`/user/update/${id}`);
    toast.success(response.data.message);
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(`/user/delete/${id}`);
    toast.success(response.data.message);
  };

  const handleUpdateTask = async (id, title, description, color) => {
    setUpdateData({
      id: id,
      title: title,
      description: description,
      color: color,
    });
    AddOverlay();
  };

  return (
    <>
      <div className=" w-full h-10">
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className="text-2xl my-2 ms-2 p-1 "
        >
          Incompleted Tasks
        </motion.h1>
      </div>

      {!incompletedTask.length ? (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className="w-full  flex flex-col justify-center items-center mt-10 h-[100vh]"
        >
          <FcDoNotInsert className="text-[20rem] " />
          <h1 className="text-[2rem]">No InCompleted Task</h1>
        </motion.div>
      ) : (
        <div className="w-full h-[100vh] flex flex-wrap">
          {!incompletedTask
            ? null
            : incompletedTask.map((curr, id) => (
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeInOut", duration: 0.8 }}
                  style={{ boxShadow: "6px 6px 10px grey" }}
                  key={id}
                  className="w-80 h-44 bg-white rounded-lg full flex flex-col   gap-3  my-7 ms-5 relative"
                >
                  <div
                    className={`w-full cursor-pointer flex justify-center items-center text-white h-10 ${
                      curr.completed ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <h1 onClick={() => handleCompleteTask(curr._id)}>
                      {curr.completed ? "Complete" : "Incomplete"}
                    </h1>
                    <div className="w-[70%] flex justify-end items-center gap-2">
                      {/* <IoMdHeart onClick={()=>handleLike(id)} className={`text-2xl ${like ? "text-red-600":"text-white"}`}/>  */}
                      <PiNotePencilBold
                        className="text-2xl"
                        onClick={() =>
                          handleUpdateTask(
                            curr._id,
                            curr.title,
                            curr.description,
                            curr.color
                          )
                        }
                      />
                      <MdOutlineDeleteOutline
                        className="text-2xl"
                        onClick={() => handleDelete(curr._id)}
                      />
                    </div>
                  </div>

                  <div
                    className={`text-wrap w-full h-10 p-2 text-${curr.color}-500  text-[1.3rem] rounded-full  flex`}
                  >
                    <h1>{curr.title}</h1>
                  </div>

                  <div className="w-[100%] capitalize p-2 text-lg flex font-sans text-wrap">
                    <h1 className="">{curr.description}</h1>
                  </div>
                </motion.div>
              ))}
        </div>
      )}
    </>
  );
};

export default IncompletedTask;
