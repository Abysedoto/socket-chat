import {connect} from 'react-redux';
import App from '../App';

const mapStateToProps = (state) => {
  return {
    isJoined: state.joinBox.isJoined
  }
}

export default connect(mapStateToProps, {})(App)