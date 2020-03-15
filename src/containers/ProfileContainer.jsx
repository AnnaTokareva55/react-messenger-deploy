import { Profile } from "../components/Profile/Profile";
import { connect } from "react-redux";

const mapStateToProps = ({ userReducer }) => {
  return {
    user: userReducer.user
  };
};

export default connect(mapStateToProps)(Profile);
