import * as React from "react";
import { useLocation } from "react-router-dom";
import HomeComponent from "../components/home/HomeComponent";
import DashboardLayout from "../layouts/HomeLayout";
import TodoComponent from "../components/home/TodoComponent";

const HomePage = () => {
  const location = useLocation();
  let current;

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
