import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, fetchTaskWeather } from "../redux/listSlice";
import makeid from "../utils/helper";
import { toast, ToastContainer } from "react-toastify";
const TaskInput = () => {
  const dispatch=useDispatch()
  const store=useSelector(store=>store.list.tasks)
  const [data,setData]=useState({
    task:'',
    priority:'',
    activity:''
  })
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!data.task){
        return toast("Input is Empty !");
    }
    if(!data.priority){
      data.priority="low"
    }
    let taskId=parseInt(store?.[store.length - 1]?.id.split('-')[0] ?? 0)+1+'-'+makeid(5)||1
    dispatch(addTask({id:taskId,...data}))
    if(data.activity=='outdoor'){
      dispatch(fetchTaskWeather({taskId}))
    }
    toast("TODO added !");
    setData({
      task:"",
      priority:"",
      activity:''
    })
  }
  return (
    <div>
      <ToastContainer />
      <form className=" bg-linear-to-r shadow-lg rounded-lg sm:rounded-full gap-2 flex-col sm:flex-row from-green-300 to-blue-400 flex justify-between px-7 py-5" onSubmit={(e)=>handleSubmit(e)}>
        <textarea rows={1} type="text" value={data?.task} className="border sm:w-[60%] p-2 rounded-lg " placeholder="Add a TODO" onChange={(e)=>setData({...data,"task":e.target.value})} />
        <select name="" id="" className="border p-1 rounded-lg h-[2.5rem]" value={data?.priority || "priority"} onChange={(e)=>setData({...data,"priority":e.target.value})}>
          <option value="priority" className="hidden" disabled>
            Priority
          </option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select name="" id="" className="border p-1 rounded-lg h-[2.5rem]" value={data?.activity || "activity"} onChange={(e)=>setData({...data,"activity":e.target.value})}>
          <option value="activity" className="hidden" disabled>
            Activity
          </option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </select>
        <Button variant="contained" sx={{background:"#323aa8"}} className="h-[2.5rem]" type="submit">Add</Button>
      </form>
    </div>
  );
};

export default TaskInput;
