import { Routes, Route } from "react-router-dom"
import Dashboard from '@/src/pages/Dashboard'
import ReviewsPage from '@/src/pages/ReviewsPage'
import CustomerLayout from '@/src/layouts/CustomerLayout'


const AppRoutes = () =>{
    return(
      <Routes>
        <Route path="/" element={<CustomerLayout/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Route>
      </Routes>
    )
}

export default AppRoutes;
