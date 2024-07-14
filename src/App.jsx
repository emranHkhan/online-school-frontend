import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/common/header/Header";
import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Team from "./components/team/Team";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import CourseDetails from "./components/course/CourseDetails";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import StudentEnrollment from "./components/StudenEnrollment/StudentEnrollment";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <>
      <AuthProvider>
        <DataProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<CourseHome />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/my-courses" element={<StudentEnrollment />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Routes>
            <Footer />
          </Router>
          <ToastContainer />
        </DataProvider>
      </AuthProvider>
    </>
  );
}

export default App;
