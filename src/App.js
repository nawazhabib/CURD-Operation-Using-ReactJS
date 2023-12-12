import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Employee from "./pages/Employee";
import EmployeeDetails from "./pages/EmployeeDetails";
import Department from "./pages/Department";
import DepartmentDetails from "./pages/DepartmentDetails";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Header />
          {/* routing pages */}
          <Routes>
            <Route path="/" element={<Employee />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/employee/" element={<EmployeeDetails />} />
            <Route path="/department" element={<Department />} />
            <Route path="/department/:id" element={<DepartmentDetails />} />
            <Route path="/department/add" element={<DepartmentDetails />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
