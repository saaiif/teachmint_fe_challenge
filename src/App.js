import React, {
  lazy,
  Suspense,
  useReducer,
  createContext,
  useContext,
} from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import reducer, { initialState } from "./Context/Reducer";
import Loader from "./Screens/Loader/Loader";
import "./styles.css";

const UserDetail = lazy(() => import("./Components/UserDetail"));
const UserDirectory = lazy(() => import("./Components/UserDirectory"));

export const MembersContext = createContext();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index={true} exact path="/" element={<UserDirectory />} />
      <Route index={true} exact path="/user/:userId" element={<UserDetail />} />

      <Route path="*" element={"Not Found"} />
    </Route>,
  ),
);

function App({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MembersContext.Provider value={{ state, dispatch }}>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
        {children}
      </Suspense>
    </MembersContext.Provider>
  );
}

export default App;

export const useMembersContext = () => {
  return useContext(MembersContext);
};
