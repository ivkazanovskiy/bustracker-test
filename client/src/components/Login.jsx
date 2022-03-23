import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authUser } from '../redux/actionCreators/userAC';
import axios from 'axios'

import { isValidPassword, isValidEmail } from '../helpers/isValid'
import { useMutation } from 'react-query';


function Login(props) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [isCorrectEmail, setIsCorrectEmail] = useState(false)
  const [isCorrectPassword, setIsCorrectPassword] = useState(false)

  const loginQuery = useMutation(() => axios({
    url: '/api/login',
    method: 'POST',
    data: {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
  }), {
    onSuccess: (response) => {

      const { token } = response.data
      localStorage.setItem('auth_token', token);
      dispatch(authUser())
      return navigate('/')
    },
    onError: (err) => {
      console.log(err.response.status);
      switch (err.response.status) {
        case 401:
          return window.alert("Неправильный пароль");
        case 403:
          return window.alert("Email не анйден");
        default:
          console.log(err);
          return window.alert("Ошибка!")
      }
    }
  })


  const checkEmail = () => {
    setIsCorrectEmail(isValidEmail(emailRef.current.value))
  }

  const checkPassword = () => {
    setIsCorrectPassword(isValidPassword(passwordRef.current.value))
  }

  return (
    <form className="w-96">
      <div className="mb-6">
        <label htmlform="email" className="block mb-2 text-sm font-medium text-gray-900">Введите email</label>
        <input ref={emailRef} onChange={checkEmail} name="email" type="email" id="email" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${!isCorrectEmail && 'border-red-500'}`} placeholder="test@example.com" required="" />
      </div>
      <div className="mb-6">
        <label htmlform="password" className="block mb-2 text-sm font-medium text-gray-900 ">Введите пароль</label>
        <input name="password" ref={passwordRef} onChange={checkPassword} type="password" id="password" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${!isCorrectEmail && 'border-red-500'} `} required="" />
        {(!isCorrectPassword) &&
          <span className="block mb-2 text-sm font-medium text-red-500 ">3-20 больших, маленьких букв и цифры</span>
        }
      </div>
      <button type="submit" onClick={(event) => {
        event.preventDefault();
        loginQuery.mutate()
      }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Войти</button>
    </form>
  );
}

export default Login;
