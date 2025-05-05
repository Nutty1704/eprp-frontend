import { Routes, Route } from "react-router-dom"
import Dashboard from '@/src/pages/Dashboard'
import ReviewsPage from '@/src/pages/ReviewsPage'
import CustomerLayout from '@/src/layouts/CustomerLayout'
import OwnerDashboard from "./pages/OwnerDashboard"
import BusinessPage from "./pages/business/BusinessPage"
import SearchPage from "./pages/SearchPage"
import BusinessProfilePage from "./pages/BusinessProfilePage"
import OwnerLayout from "./layouts/OwnerLayout"


const AppRoutes = () =>{
    return(
      <Routes>
        <Route path="/" element={<CustomerLayout/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/business/:id" element={<BusinessPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/search" element={<SearchPage/>}/>
        </Route>

        <Route path='/owner'element={<OwnerLayout />}>
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/manage-business" element={<BusinessProfilePage/>}/>
        </Route>
      </Routes>
    )
}

export default AppRoutes;
