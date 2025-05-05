import { Routes, Route } from "react-router-dom"
import Dashboard from '@/src/pages/Dashboard'
import ReviewsPage from '@/src/pages/ReviewsPage'
import CustomerLayout from '@/src/layouts/CustomerLayout'
import OwnerDashboard from "./pages/OwnerDashboard"
import UserProfile from "./pages/UserProfilePage"
import BusinessPage from "./pages/business/BusinessPage"
import SearchPage from "./pages/SearchPage"
import BusinessProfilePage from "./pages/BusinessProfilePage"
import BusinessForm from "./components/admin/business-form/BusinessForm"


const AppRoutes = () =>{
    return(
      <Routes>
        <Route path="/" element={<CustomerLayout/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/business/:id" element={<BusinessPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/search" element={<SearchPage/>}/>
        </Route>
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/owner/business/:businessId" element={<BusinessProfilePage />} />
        <Route path="/owner/business/new" element={<BusinessProfilePage />} />
      </Routes>
    )
}

export default AppRoutes;
