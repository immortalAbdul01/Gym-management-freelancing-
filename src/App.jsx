import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Plans from "./components/Plans";
import About from "./components/About";
import Login from "./components/login";
import SignUp from "./components/signup";
import Trainers from "./components/Trainers";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import firebaseApp from "./components/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Admin from "./components/Admin";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(firebaseApp);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
		setUser(user);
		console.log(user)
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
			  <main>
				  <Navbar/>
          <div id="home">
            <Home />
          </div>
          <div id="plans">
            <Plans />
          </div>
          <div id="about">
            <About />
          </div>
          <div id="trainers">
            <Trainers />
          </div>
          <div id="contact">
            <Contact />
				  </div>
				  <div>
					  <Admin/>
				  </div>
          <Footer />
        </main>
      ) : (
        <>
          {/* <Login /> */}
          <SignUp />
        </>
      )}
    </div>
  );
};

export default App;
