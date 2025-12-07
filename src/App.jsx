import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Layout from "./components/Layout.jsx";
import NotFound from "./components/NotFound.jsx";
import Home from "./pages/Home/Home.jsx";
import Register from "./forms/Register.jsx";
import Login from "./forms/login.jsx";
import CreatePartnerProfile from "./forms/CreatePartnerProfile.jsx";
import AllScholarships from "./pages/AllScholarships.jsx";
import MyConnections from "./pages/MyConnections.jsx";
import PrivateRoute from "./routes/privateRoute.jsx";
import PaymentSuccess from "./components/PaymentSuccess.jsx";
import PaymentFailed from "./components/PaymentFailed.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

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
              <Route path="/scholarship/:id" element={<CreatePartnerProfile />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/failed" element={<PaymentFailed />} />
              <Route path="/checkout" element={<MyConnections />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Login protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
