import { Routes, Route, Navigate } from "react-router-dom"
import BusinessProfilePage from "./pages/BusinessProfilePage";

const AppRoutes = () =>{
    return(
        <Routes>
            <Route 
                path="/manage-business"
                element={<BusinessProfilePage/>}/>
            <Route 
                path="/*" 
                element={<Navigate to="/"/>}/>
        </Routes>
    )
}

export default AppRoutes;