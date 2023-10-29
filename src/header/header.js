import React, { useState, useContext, useEffect} from "react";
import { AuthContext } from '../AuthContext';
import { Route, Link, Routes, useNavigate} from "react-router-dom";
import axios from "axios"; 
import './header.css'
import './375pxheader.css'
import logo from './logo.svg'
import burger from './Group 6.svg'
import logo2 from './eqw 1.svg'
import spiner from './icons8-спиннер,-кадр-5-100 1.svg'
import user from './samsung-memory-hjRC0i0oJxg-unsplash 1.png'
import closed from './x.svg'
import Home from '../MainPage/home'
import Form from '../FormPage/formAuth'
import SearchPage from '../Search-page/SearchPage'
import ResultPage from "../ResultPage/resultPage";



const About = () => {
  return <h2>Страница "О нас"</h2>;
};

const Contact = () => {
  return <h2>Страница "Контакты"</h2>;
};



const ReactRouterRoute = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn, isLoading, setIsLoading} = useContext(AuthContext);
  const [data, setData] = useState ([])
  const navigate = useNavigate();

const PrivateRoute = () => {
  return (isLoggedIn) ? <SearchPage /> : <Home />;
}
const PrivateRoute2 = () => {
  return (isLoggedIn) ? <ResultPage /> : <Home />;
}

//Выпадающее меню
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

//Функция выхода из профиля
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); 
    setIsLoggedIn(false);
    return navigate("/");
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('https://gateway.scan-interfax.ru/api/v1/account/info', {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        });
        setData([response.data.eventFiltersInfo])
        console.log([response.data.eventFiltersInfo]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        
      }
    };
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);


  return (
    <>
      <header>
        <div className="nav">
          <Link to="/">
            <img
              className={`header-logo ${
                isMenuOpen ? "adative-menu-start" : "adaptive-menu-end"
              }`}
              src={logo}
              alt="Логотип к"/>
          </Link>
          <nav className="navigation">
            <ul>
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/about">Тарифы</Link>
              </li>
              <li>
                <Link to="/contact">FAQ</Link>
              </li>
            </ul>
          </nav>
    
{isLoggedIn ? (
  isLoading ? (
    <div className='blockData' > <img
    className="spinner"
    src={spiner}
    alt="Логотип" /></div>
  ) : (
    data.map((item) => (
      <div className={`blockData ${isMenuOpen ? "adative-logo-start" : "adaptive-logo-end"}`} key={item.id}>
        <div>
          <p className="textInfo margin1">Использовано компаний</p>
          <p className="comLimit margin1">{item.companyLimit}</p>
        </div>
        <div>
          <p className="textInfo margin">Лимит по компаниям</p>
          <p className="comCount marginUs">{item.usedCompanyCount}</p>
        </div>
      </div>
    ))
  )
) : null}
          {isLoggedIn ? (
            <div className="logOut">
               <div>
                  <div className="user">Алексей А.</div>
                  <button className="out" onClick={handleLogout}>Выйти</button>
              </div>
              <img
                className="usOut"
                src={user}
                alt="Логотип компании"
              />
          </div>
          ) : (
            <div className="authorization">
            <div className="registration">Зарегистрироваться</div>
            <div className="registration">|</div>
            <div>
              <Link to="/form">
                <button className="enter">Войти</button>
              </Link>
            </div>
          </div>
          )}
          <div
            className={`header-burger  ${ isMenuOpen ? "adative-logo-start" : "adaptive-logo-end" }`}
            onClick={toggleMenu}>

            <img src={burger} alt="Логотип компании" />
          </div>
        </div>
      </header>
      <section className="menuViev">
        <div
          className={`adaptive-menu ${
            isMenuOpen ? "adaptive-menu-end" : "adative-menu-start"
          }`}
        >
          <div className="burger-adaptive">
            <Link to="/">
              <img
                className="header-logo"
                src={logo2}
                alt="Логотип компании"
              />
            </Link>

            <img
              className="closed"
              onClick={toggleMenu}
              src={closed}
              alt="Логотип компании"
            />
          </div>
          <div
            className={`adaptive-items ${
              isMenuOpen ? "adaptive-menu-end" : "adative-menu-start"
            }`}
          >
            <ul>
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/about">Тарифы</Link>
              </li>
              <li>
                <Link to="/contact">FAQ</Link>
              </li>
            </ul>
          </div>
          <div></div>
          <div
            className={`adaptive-autorization ${
              isMenuOpen ? "adaptive-menu-end" : "adative-menu-start"
            }`}
          >
            <div className="adaptive-registration">Зарегистрироваться</div>
          
            {isLoggedIn ? (
            <div>
            <Link to="/form">
              <button className="adaptive-enter" onClick={()=>{handleLogout();closeMenu();}}>Выйти</button>
            </Link>
          </div>
          ) : (
            <div>
              <Link to="/form">
                <button className="adaptive-enter" onClick={closeMenu}>Войти</button>
              </Link>
            </div>
          )}
          
          </div>
        </div>
      </section>

<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/form" element={<Form />} />
       
       
       <Route  path={"/Search-page"} element={PrivateRoute()} />
       <Route path="/resultPage" element={PrivateRoute2()} />
       
      
</Routes>
      
    </>
  );
};

export default ReactRouterRoute;