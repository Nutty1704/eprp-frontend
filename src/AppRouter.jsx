import { Routes, Route } from "react-router-dom"
import Dashboard from '@/src/pages/Dashboard'
import ReviewsPage from '@/src/pages/ReviewsPage'
import CustomerLayout from '@/src/layouts/CustomerLayout'
import OwnerDashboard from "./pages/OwnerDashboard"
import BusinessProfilePage from "./pages/BusinessProfilePage"


const AppRoutes = () =>{
    return(
      <Routes>
        <Route path="/" element={<CustomerLayout/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Route>
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/owner/business/:businessId" element={<BusinessProfilePage />} />
      </Routes>
    )
}

export default AppRoutes;
