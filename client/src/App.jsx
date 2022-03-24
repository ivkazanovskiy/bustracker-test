
import Login from './components/Login';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkUser } from './redux/thunksCreators/chechUserAC';

function App() {

  const { auth } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  if (auth === undefined) {
    dispatch(checkUser())
    return (<>Загрузка</>)
  }

  return (
    <BrowserRouter >
      <NavBar />
      <section className="flex h-full justify-center items-stretch">
        <Routes>

          <Route path="/login" element={<Login />} />,

          {auth ?
            <Route path="/" element={<Home />} />
            :
            <Route path="/" element={<></>} />
          }

        </Routes>
      </section>
    </BrowserRouter >
  );
}

export default App;
