import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Layout from "./components/Layout.jsx";
import NotFound from "./components/NotFound.jsx";
import Home from "./pages/Home/Home.jsx";
import Register from "./forms/Register.jsx";
import Login from "./forms/login.jsx";
import AllScholarships from "./pages/AllScholarships.jsx";
import ScholarshipDetails from "./pages/ScholarshipDetails.jsx";
import PrivateRoute from "./routes/privateRoute.jsx";
import PaymentSuccess from "./components/PaymentSuccess.jsx";
import PaymentFailed from "./components/PaymentFailed.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import MyProfile from "./pages/Dashboard/MyProfile.jsx";
import MyApplications from "./pages/Dashboard/MyApplications.jsx";
import MyReviews from "./pages/Dashboard/MyReviews.jsx";
import ManageApplications from "./pages/Dashboard/ManageApplications.jsx";
import AllReviews from "./pages/Dashboard/AllReviews.jsx";
import AddScholarship from "./forms/AddScholarship.jsx";
import ManageScholarships from "./pages/Dashboard/ManageScholarships.jsx";
import ManageUsers from "./pages/Dashboard/ManageUsers.jsx";
import Analytics from "./pages/Dashboard/Analytics.jsx";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/all-scholarships" element={<AllScholarships />} />

            {/* Login protected routes */}
            <Route element={<PrivateRoute />}>
              {/* prettier-ignore */}
              <Route path="/scholarship/:id" element={<ScholarshipDetails />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/failed" element={<PaymentFailed />} />
              <Route path="/checkout" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Login protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<MyProfile />} />

              <Route path="add-scholarship" element={<AddScholarship />} />
              {/* prettier-ignore */}
              <Route path="manage-scholarships" element={<ManageScholarships />} />
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="analytics" element={<Analytics />} />

              {/* prettier-ignore */}
              <Route path="manage-applications" element={<ManageApplications />} />
              <Route path="all-reviews" element={<AllReviews />} />

              <Route path="my-applications" element={<MyApplications />} />
              <Route path="my-reviews" element={<MyReviews />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
