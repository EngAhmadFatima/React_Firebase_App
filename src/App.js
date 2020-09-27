import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./Styles/root.scss";
import { UserProvider } from "./Services/UserContext";
import { GlobalProvider } from "./Services/GlobalState";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/shares/Navbar";
import Footer from "./components/shares/Footer";
import Jobs from "./pages/Jobs";
import Login from "./pages/private/Login";
import Dashboard from "./pages/private/Dashboard";
import JobsAdmin from "./pages/private/JobsAdmin";
import Invoices from "./pages/private/Invoices";

function App() {
  return (
    <div>
      <GlobalProvider>
        <UserProvider>
          <Router>
            <Navbar />
            <div className="root">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/jobs" component={Jobs} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/jobsAdmin" component={JobsAdmin} />
                <Route exact path="/invoices" component={Invoices} />
              </Switch>
            </div>
            <Footer />
          </Router>
        </UserProvider>
      </GlobalProvider>
    </div>
  );
}

export default App;
