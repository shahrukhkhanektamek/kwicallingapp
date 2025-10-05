import React, { createRef, useContext, useState } from "react";
import AuthNavigator from "./AuthNavigator";
import DrawerNavigator from "./DrawerNavigator";

import { AppContext } from "../Context/AppContext";

export const navigationRef = createRef();

export default function RootNavigator() { 

  const { userLoggedIn, setUserLoggedIn } = useContext(AppContext);

  return userLoggedIn ? (
    <DrawerNavigator />
  ) : (
    <AuthNavigator onLogin={() => setUserLoggedIn(true)} />
  );
}
