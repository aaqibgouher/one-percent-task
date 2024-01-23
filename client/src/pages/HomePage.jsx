import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeComponent from "../components/home/HomeComponent";
import DashboardLayout from "../layouts/HomeLayout";
import TodoComponent from "../components/home/TodoComponent";
import { useSelector } from "react-redux";

const HomePage = () => {
  const location = useLocation();
  let current;

  // if token not exists, redirect to auth page
  const tokenState = useSelector((state) => state.userReducer.token);
  const tokenLocalStorage = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!tokenState?.token && !tokenLocalStorage) {
    navigate("/login");
    return;
  }

  if (location.pathname === "/") {
    current = "home";
  } else {
    current = location.pathname.split("/")[1];
  }

  const componentMapping = {
    home: HomeComponent,
    todo: TodoComponent,
  };

  const MyComponent = componentMapping[current];

  return (
    <DashboardLayout>
      <MyComponent />
    </DashboardLayout>
  );
};

export default HomePage;
