import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchWeather from "../utils/fetchWeather";

export const fetchTaskWeather=createAsyncThunk(
  'tasks/fetchWeather',
  async({taskId},{rejectWithValue})=>{
    try{
      const data=await fetchWeather();
      return {taskId,data};
    }
    catch(error){
      return rejectWithValue(error.message)
    }
  }
)

const listSlice = createSlice({
  name: "list",
  initialState: {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    removeTask: (state, action) => {
      let newTasks=state.tasks.filter((task) => task.id != action.payload);
      state.tasks=newTasks
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchTaskWeather.fulfilled,(state,action)=>{
      const {taskId,data}=action.payload;
      const task=state.tasks.find(task=>task.id===taskId);
      if(task){
        task.weather=data;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    })
    .addCase(fetchTaskWeather.rejected,(state,action)=>{
      console.error("Weather fetch failed: "+action.payload)
    })
  }
});
export const { addTask, removeTask } = listSlice.actions;
export default listSlice.reducer;
