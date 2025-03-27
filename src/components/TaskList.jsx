import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import TaskInput from "./TaskInput";
import { IoAddOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { removeTask } from "../redux/listSlice";
const TaskList = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.list.tasks);
  const priorityOrder = { high: [1,'bg-linear-to-r from-red-400 to-gray-200'], medium: [2,'bg-linear-to-r from-yellow-400 to-gray-200'], low: [3,'bg-linear-to-r from-blue-400 to-gray-200'] };
  const sortedTasks=[...data].sort((a,b)=>{
    return priorityOrder[a.priority][0]-priorityOrder[b.priority][0]
  })
  return (
    <div className="w-full">
      <div className=" flex justify-between p-4 w-full">
        <p className="font-bold bg-purple-700 p-2 rounded-lg text-yellow-600">ToDoList</p>
        <Button variant="contained" onClick={() => dispatch(logout())}>
          Logout
        </Button>
      </div>
      <div className="w-full md:w-[50rem] mx-auto p-4">
        <TaskInput />
        <div className="mt-4">
          {sortedTasks.map((el, i) => {
            return (
              <div
                className={`flex shadow-lg items-center justify-between p-2 rounded-lg my-2 ${el.priority?priorityOrder[el.priority][1]:'bg-gray-300'}`}
                key={el.id}
              >
                <div className="w-[95%]">
                  <p>{el.task}</p>
                  {el.weather && (
                    <div className="text-xs bg-linear-to-r from-blue-200 to-gray-300 p-1 my-1 rounded-lg">
                      <p>Weather Info:</p>
                      <p>Temperature: {el.weather.temp-273.15} °C</p>
                      {el.weather.humidity && (
                        <p>Humidity: {el.weather.humidity} %</p>
                      )}
                      <p>Description: {el.weather.description}</p>
                    </div>
                  )}
                </div>
                <RiDeleteBin5Line

                  className="size-[1.5rem] cursor-pointer text-red-800"
                  onClick={() => {
                    dispatch(removeTask(el.id));
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
