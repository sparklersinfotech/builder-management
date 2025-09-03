import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/login";
import Home from "./pages/home";
import Search from "./pages/search";
import NewCustomer from "./pages/NewCustomer";
import AddProject from "./pages/AddProject";
import CustomerList from "./pages/CustomerList";
import Reports from "./pages/reports";
import AddExecutive from "./pages/add-executive";
import ExecutiveManagement from "./pages/executive-management";
import AllProjects from "./pages/AllProjects";
import AddClinetProject from "./pages/Add-show-Project";
import PieChart from "./pages/PieChart";
import CustomerDetail from "./pages/CustomerDetail";
import DetailedList from "./pages/DetailedList";
import AllEnquiries from "./pages/AllEnquiries";
import ReportDashboard from "./pages/Report";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new-customer"
              element={
                <ProtectedRoute>
                  <NewCustomer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-project"
              element={
                <ProtectedRoute>
                  <AddProject />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer-list"
              element={
                <ProtectedRoute>
                  <CustomerList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-executive"
              element={
                <ProtectedRoute>
                  <AddExecutive />
                </ProtectedRoute>
              }
            />
            <Route
              path="/executive-management"
              element={
                <ProtectedRoute>
                  <ExecutiveManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/allprojects"
              element={
                <ProtectedRoute>
                  <AllProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-client-project"
              element={
                <ProtectedRoute>
                  <AddClinetProject />
                </ProtectedRoute>
              }
            />

            <Route
              path="/detailed-list/:type"
              element={
                <ProtectedRoute>
                  <DetailedList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/CustomerDetail/:id"
              element={
                <ProtectedRoute>
                  <CustomerDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  <ReportDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/all-enquiries"
              element={
                <ProtectedRoute>
                  <AllEnquiries />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

