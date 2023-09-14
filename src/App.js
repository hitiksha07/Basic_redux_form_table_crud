import logo from './logo.svg';
import './App.css';
import Form from './component/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './component/Router/Router';
import { useDispatch, useSelector } from 'react-redux';
import { getUserValue } from './Redux/Action/UserAction';
import { useEffect } from 'react'
import ApiRouter from './component/Api/ApiRouter';
import { getApidata } from './Redux/Action/ApiAction';

function App() {
  // let dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getApidata())
  // }, []);
  return (
    <>
      {/* <Form /> */}
      {/* <Router /> */}
      <ApiRouter />
    </>
  );
}

export default App;
