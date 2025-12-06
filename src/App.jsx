import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Layout from "./components/Layout.jsx";
import NotFound from "./components/NotFound.jsx";
import Home from "./pages/Home/Home.jsx";
import Register from "./forms/Register.jsx";
import Login from "./forms/login.jsx";
import CreatePartnerProfile from "./forms/CreatePartnerProfile.jsx";
import FindPartners from "./pages/FindPartners.jsx";
import MyConnections from "./pages/MyConnections.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./routes/privateRoute.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
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
            <Route path="/all-scholarships" element={<FindPartners />} />
            <Route element={<PrivateRoute />}>
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/failed" element={<PaymentFailed />} />
              {/* prettier-ignore */}
              <Route path="/scholarship-details/:id" element={<CreatePartnerProfile />} />
              <Route path="/checkout" element={<MyConnections />} />
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
