import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Services/UserContext";
import NewJob from "../../components/jobs/NewJob";

function Dashboard({ history }) {
  const currentUser = useContext(UserContext);

  if (!currentUser) {
    //history.push("/login");
    return <Link to="/login">Login</Link>;
  } else {
    return (
      <div>
        <NewJob />
      </div>
    );
  }
}

export default Dashboard;
