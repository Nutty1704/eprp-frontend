import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./layouts/Layout"
import BusinessProfilePage from "./pages/BusinessProfilePage";

const AppRoutes = () =>{
    return(
        <Routes>
            <Route 
                path="/manage-business"
                element={<Layout><BusinessProfilePage/></Layout>}/>
            <Route 
                path="/*" 
                element={<Navigate to="/"/>}/>
        </Routes>
    )
}

export default AppRoutes;