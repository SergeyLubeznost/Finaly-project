import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"; 
import { AuthContext } from '../AuthContext';
import google from './Group 1171274229.svg'
import facebook from './Group 1171274230.svg'
import yandex from './Group 1171274231.svg'
import peopleKey from './Characters.svg'
import lock from './Group 1171274237.svg'
import './formAuth.css'
import './375pxformAuth.css'





const Form = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { isLoggedIn, setIsLoggedIn, accessToken, setAccessToken} = useContext(AuthContext);
    const [formValid, setFormValid] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
      if (username && password ) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    }, [username,password]);

    
    const handleSubmit = async (event) => {
        event.preventDefault();

          // Отправка данных на сервер
           try {
          const accessToken = await login(username, password);
          console.log(`Access token: ${accessToken}`);
          localStorage.setItem('accessToken', accessToken);
          setIsLoggedIn(true);
        } catch (error) {
          console.error(error);
        }
      };
      
      const login = async (username, password) => {
        try {
          const response = await axios.post('https://gateway.scan-interfax.ru/api/v1/account/login', {
            login: username,
            password: password
          }, {
            headers: {
              'Content-type': 'application/json',
              'Accept': 'application/json'
            }
          });
          setAccessToken(response.data.accessToken);
          const expireDate = response.data.expire;
          console.log(`Access token: ${accessToken}`);
          console.log(`Expire date: ${expireDate}`);
          
          return accessToken;
        } catch (error) {
          console.error(error);
            setLoginError(true);
            setPasswordError(true);
            setIsLoggedIn(false);
            console.log(isLoggedIn)
          throw error;
        }
        
      
       
      };

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
          setIsLoggedIn(true);
          
       }
      
     },[]);

      useEffect(() => {
        if (isLoggedIn) {
          navigate('/');
        }
      }, [isLoggedIn, navigate]);

      

    return (
    
  <section className='fCont'>
    <img className='lock' src={lock} alt="key" />
    <div className="formContainer">
    <div className="titleForm">
        <p>Для оформления подписки 
на тариф, необходимо авторизоваться.</p>

        <img src={peopleKey} alt="key" />
    </div>

    <div className="formBlock">
        <div className="authSelect">
            <p className='enterForm'>Войти</p>
            <p className='reg'>Зарегистрироваться</p>
        </div>
        <form className='formEdit' onSubmit={handleSubmit}>
  <label className='logIn' htmlFor="login">Логин или номер телефона:</label>
  <input type="text" className={` ${loginError ? 'error' : 'inputDef'}`} required id='login' value={username} onChange={(event) => {
  setUsername(event.target.value);
  setLoginError(false);
  setPasswordError(false);
}} />  {loginError && <p className="error-message">Неправильный логин или пароль</p>}

  <label htmlFor="password">Пароль:</label>
  <input className={`paSS ${passwordError ? 'error' : 'inputDef'}`} type="password" required id='password' value={password} onChange={(event) => {
  setPassword(event.target.value);
  setPasswordError(false);
  setPasswordError(false);
}} />  {passwordError && <p className="error-message">Неправильный логин или пароль</p>}

  <button type="submit" disabled={!formValid}>Войти</button>
  <p className="restore">Восстановить пароль</p>
</form>

        <div className="loginVia">
            <p>Войти через:</p>
            <div>
                <img src={google} alt="google" /><img src={facebook} alt="facebook" /><img src={yandex} alt="yandex" />
            </div>
        </div>

    </div>


    </div>
  </section>
    )
  };

  export default Form;