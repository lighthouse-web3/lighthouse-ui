import { createContext, useContext } from "react";

export const RouteContext = createContext("/");
export const useRoutePath = () => useContext(RouteContext);
