import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from "./store.js"
import UserList from './components/UserList.jsx';
function App() {
  return (
    <Provider store={store}>
      <UserList/>
    </Provider>
  );
}

export default App;
