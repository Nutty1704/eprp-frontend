import { Routes, Route } from "react-router-dom"
import Dashboard from '@/src/pages/Dashboard'
import ReviewsPage from '@/src/pages/ReviewsPage'
import CustomerLayout from '@/src/layouts/CustomerLayout'
import OwnerDashboard from "./pages/OwnerDashboard"
import SearchPage from "./pages/SearchPage"
import BusinessProfilePage from "./pages/BusinessProfilePage"


const AppRoutes = () =>{
    return(
      <Routes>
        <Route path="/" element={<CustomerLayout/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/search" element={<SearchPage/>}/>
        </Route>
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/owner/business/:businessId" element={<BusinessProfilePage />} />
        <Route path="/manage-business" element={<BusinessProfilePage/>}/>
      </Routes>
    )
}

export default AppRoutes;
