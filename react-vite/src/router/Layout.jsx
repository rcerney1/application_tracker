import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import { ModalProvider, Modal } from "../context/Modal";
import './router.css'


export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);  // Get user from Redux store

  // This will authenticate the user on load
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='layout-container'>
      <ModalProvider>
        <Navigation />
        <div className="main-content">
          <Outlet/>
        </div>
        <Modal />
      </ModalProvider>
    </div>
  );
}
