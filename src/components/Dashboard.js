import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const Dashboard = () => {
  const auth = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const { first_name, last_name, mobile_no, whatsapp_no } = auth.basic_info;
  const Logout = () => {
    localStorage.clear();
    dispatch(logout());
  };
  return (
    <>
      <div className="container">
        <h1 className="title">Physioai</h1>
        <p className="welcome">Welcome {`${first_name} ${last_name}`}!</p>
        <p>Your role: {auth.role}</p>
        <p>Your Mobile: {mobile_no}</p>
        <p>Your Whatsapp: {whatsapp_no}</p>
        <button onClick={Logout} style={{ marginTop: "30px" }}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Dashboard;
