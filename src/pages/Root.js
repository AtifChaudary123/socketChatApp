import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigations from "../component/MainNavigations";
import classes from "../pages/css/Root.module.css";

export default function RootLayout() {
  return (
    <>
      <MainNavigations />
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
}
