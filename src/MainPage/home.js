import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from '../AuthContext';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { Link} from "react-router-dom";
import 'pure-react-carousel/dist/react-carousel.es.css';
import './main.css'
import './375main.css'
//import SearchPage from '../Search-page/SearchPage'
import imageReq from './23981.png'
import time from './Maskgroup.png'
import lupa from './Maskgroup2.svg'
import guard from './Maskgroup3.svg'
import right from './icons8-left.svg'
import left from './icons8-right.svg'
import hiPhoto from './Group14.png'
import lamp from './Group 1171274214.svg'
import target from './Group 1171274216.svg'
import laptop from './Group 1171274215.svg'

 
 
 const Home = () => {

  const [visibleSlides, setVisibleSlides] = useState(3);
  const { isLoggedIn} = useContext(AuthContext);
 
  const [selectedTariff, setSelectedTariff] = useState(null);

  const handleTariffSelect = (tariff) => {
    setSelectedTariff(tariff);
    localStorage.setItem('selectedTariff', tariff);
  };

  useEffect(() => {
    const savedTariff = localStorage.getItem('selectedTariff');
    if (savedTariff) {
      setSelectedTariff(savedTariff);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setVisibleSlides(1);
      } else {
        setVisibleSlides(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

    return (
     <main>
      <div className="requestContainer">
        <div className="requstTitle">
          <div className="contTitle">
          <p>сервис по поиску
             публикаций 
              <br />о компании 
              <br /> по его ИНН</p>
          <p className='par'>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
          </div> 
          <Link to="/Search-page"><button className={`requestData  ${isLoggedIn ? '' : 'noneButton'}`}>Запросить данные</button></Link> 
        </div>
        <div className="imageRequest"><img src={imageReq} alt="Логотип компании" /></div>
      </div>

      <div className="whyWe">
        <div className="whyTitle"><p>Почему именно мы</p></div>
        <div className='contSlider'>
        <CarouselProvider className="carousel"
        
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={6}
        visibleSlides={visibleSlides}
        infinite={true}
      >
        
        <Slider className="slider" >
          <Slide index={0} ><div className="fastTime"> 
          <img src={time} alt="Логотип компании" />
          <p>Высокая и оперативная скорость обработки заявки</p>
          </div></Slide>
          <Slide index={1}><div className="base"><img src={lupa} alt="Логотип компании" />
          <p>Высокая и оперативная скорость обработки заявки</p></div>
         </Slide>
          <Slide index={2}><div className="guard"> <img src={guard} alt="Логотип компании" />
          <p>Высокая и оперативная скорость обработки заявки</p></div></Slide>
       
        <Slide index={3} ><div className="fastTime"> 
          <img src={time} alt="Логотип компании" />
          <p>Высокая и оперативная скорость обработки заявки</p>
          </div></Slide>
          <Slide index={4}><div className="base"><img src={lupa} alt="Логотип компании" />
          <p>Высокая и оперативная скорость обработки заявки</p></div>
         </Slide>
          <Slide index={5}><div className="guard"> <img src={guard} alt="Логотип компании" />
          <p>Высокая и оперативная скорость обработки заявки</p></div></Slide>
        </Slider>
        <ButtonBack className="buttonBack"><img src={left} alt="Логотип компании" /></ButtonBack>
        <ButtonNext className="buttonNext"><img src={right} alt="Логотип компании" /></ButtonNext>
        
      </CarouselProvider>
      
       </div>
      </div>

      <section className="hiPhoto"><img src={hiPhoto} alt="Логотип компании" /></section>

      <section className="containerTariff">
        <div className="tariffTitle"><p>наши тарифы</p></div>
        <div className="cardContainer">
          <div className={`tariffCard ${isLoggedIn ? selectedTariff === 'Beginner' ? 'selected' : '' : null}`}
            onClick={isLoggedIn ? () => handleTariffSelect('Beginner') : null}>
              <div className="card">
                  <div className="cardHead yellow">
                  <p className="whiteT"> Beginner</p>
                      <p className="whiteP">Для небольшого исследования</p>
                   </div>
                  <img className="laptop" src={laptop} alt="Логотип компании" />
              </div>
              <div className="optionTariff">
                    <div className={`currentTariff spyBut ${isLoggedIn ? (selectedTariff === 'Beginner' ? 'buttonSelect3' : ''): null}`}>
                        <button>Текущий тариф</button>
                    </div>
                    <div className="price">
                        <p>799 <span>1200</span></p>
                        <p className="condition">или 150 ₽/мес. при рассрочке на 24 мес.</p>
                    </div>  
                    <div className="listTariff">
                        <p>В тариф входит:</p>
                        <ul>
                          <li>Безлимитная история запросов</li>
                          <li>Безопасная сделка</li>
                          <li>Поддержка 24/7</li>
                        </ul>
                    </div>  
                    {isLoggedIn ? (selectedTariff === 'Beginner' ? <button className="selectMore">
                    Перейти в личный кабинет
                    </button> : <button className="more">
                    Подробнее
                    </button>) : <button className="more">
                    Подробнее
                    </button>}
              </div>
          </div>

          <div className={`tariffCard ${isLoggedIn ? (selectedTariff === 'Pro' ? 'selected2' : '') : null}`} 
          onClick={isLoggedIn ? () => handleTariffSelect('Pro') : null}>
          <div className="card">
                  <div className="cardHead blue">
                      <p className="whiteT"> <span >Pro</span></p>
                      <p className="whiteP">Для HR и фрилансеров</p>
                   </div>
                  <img className="target" src={target} alt="Логотип компании" />
              </div>
              <div className="optionTariff">
              <div className={`currentTariff spyBut ${isLoggedIn ? (selectedTariff === 'Pro' ? 'buttonSelect2' : '') : null}`} >
                        <button>Текущий тариф</button>
                    </div>
                    <div className="price">
                        <p>1 299 ₽ <span>2 600 ₽</span></p>
                        <p className="condition">или 279 ₽/мес. при рассрочке на 24 мес.</p>
                    </div>  
                    <div className="listTariff">
                        <p>В тариф входит:</p>
                        <ul>
                          <li>Все пункты тарифа Beginner</li>
                          <li>Экспорт истории</li>
                          <li>Рекомендации по приоритетам</li>
                        </ul>
                    </div>  
                    {isLoggedIn ? (selectedTariff === 'Pro' ? <button className="selectMore">
                    Перейти в личный кабинет
                    </button> : <button className="more">
                    Подробнее
                    </button>) : (<button className="more">
                    Подробнее
                    </button>) }
              </div>

          </div>

          <div className={`tariffCard blackHeight ${isLoggedIn ? (selectedTariff === 'Business' ? 'selected3' : '') : null}`}
          onClick={isLoggedIn ? () => handleTariffSelect('Business') : null}>
              <div className="card">
                  <div className="cardHead black">
                       <p className="blackT"><span >Business</span></p>
                      <p className="blackP">Для корпоративных клиентов</p>
                   </div>
                  <img className="lamp" src={lamp} alt="Логотип компании" />
              </div>
              <div className="optionTariff">
              <div className={`currentTariff spyBut ${isLoggedIn ? (selectedTariff === 'Business' ? 'buttonSelect3' : '') : null}`}>
                        <button>Текущий тариф</button>
                    </div>
                    <div className="price">
                        <p>2 379 ₽ <span>3 700 ₽</span></p>
                        <p className="condition"> </p>
                    </div>  
                    <div className="listTariff">
                        <p>В тариф входит:</p>
                        <ul>
                          <li>Все пункты тарифа Pro</li>
                          <li>Безлимитное количество запросов</li>
                          <li>Приоритетная поддержка</li>
                        </ul>
                    </div>  

                    {isLoggedIn ? (selectedTariff === 'Business' ? <button className="selectMore">
                    Перейти в личный кабинет
                    </button> : <button className="more">
                    Подробнее
                    </button>) : (<button className="more">
                    Подробнее
                    </button>)}
                   
                   
              </div>
          </div>
        </div>
      </section>
     </main> 
   
    )
  };

  export default Home