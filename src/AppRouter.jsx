import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./layouts/Layout"
import HomePage from "./Pages/HomePage";

const AppRoutes = () =>{
    return(
        <Routes>
            <Route 
                path="/manage-restaurant"
                element={<Layout><ManageRestaurantPage/></Layout>}/>
            <Route 
                path="/*" 
                element={<Navigate to="/"/>}/>
        </Routes>
    )
}

export default AppRoutes;