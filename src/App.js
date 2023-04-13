import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeekActivities from "./pages/Dashboard/WeekActivities";
import SingIn from "./pages/SingIn";
import Registration from "./pages/Registration";
import UserProvider from "./contexts/TokenContext";
import Subjects from "./pages/Dashboard/Subjects";
import Dashboard from "./pages/Dashboard";
import Absences from "./pages/Dashboard/Absences";
import Grades from "./pages/Dashboard/Grades";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SingIn />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/subjects" element={<Subjects />} />
          <Route path="/dashboard/weekActivities" element={<WeekActivities />} />
          <Route path="/dashboard/absences" element={<Absences />} />
          <Route path="/dashboard/grades" element={<Grades />} />

        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;