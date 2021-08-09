import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import TaskBox from "./components/TaskBox";
import "./App.css";
import { LoginUser } from "./redux/Login/actions";
import { Sidebar } from "./components/Sidebar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoginUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Sidebar />
      <TaskBox />
    </div>
  );
}

export default connect(null, null)(App);
