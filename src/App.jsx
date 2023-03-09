import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserContextProvidor } from "./context/userContext";
import { PostContextProvider } from "./context/postContext";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";

const Home = lazy(() => import("./pages/Home"));
const Details = lazy(() => import("./pages/Details"));
const Profile = lazy(() => import("./pages/Profile"));
const Upload = lazy(() => import("./pages/Upload"));
const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));

function App() {
  return (
    <BrowserRouter>
      <PostContextProvider>
        <UserContextProvidor>
          <div className="">
            <Navbar />
            <div className="h-[60px]"></div>

            <div>
              <Suspense
                fallback={
                  <div className="text-white flex justify-center py-5">
                    <Loader />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/:id" element={<Details />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/auth/register" element={<Register />} />
                  <Route path="/auth/login" element={<Login />} />
                </Routes>
              </Suspense>
            </div>
            <Footer />
          </div>
        </UserContextProvidor>
      </PostContextProvider>
    </BrowserRouter>
  );
}

export default App;
