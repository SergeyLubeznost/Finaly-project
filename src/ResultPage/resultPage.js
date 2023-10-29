import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from '../AuthContext';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./resultPage.css"
import "./375pxresultPage.css"
import woman from "./Group 1171274267.svg"
import right from '../MainPage/icons8-left.svg'
import left from '../MainPage/icons8-right.svg'
import spiner2 from '../header/icons8-спиннер,-кадр-5-100 1.svg'



const ResultPage = () => {
    const [visibleSlides, setVisibleSlides] = useState(3);
    const {accessToken, totalDocuments,riskFactors, isLoadingSearch,  documents, setDocuments, encodedIds} = useContext(AuthContext);
    const [visibleCount, setVisibleCount] = useState(10);
    
    
    
    const resultResponse = async () => {
      const chunkSize = 10; 
      const startIndex = documents.length;
    
      const last10Ids = encodedIds.slice(startIndex, startIndex + chunkSize);
      
      try {
        const response4 = await axios.post(
          'https://gateway.scan-interfax.ru/api/v1/documents',
          {
            ids: last10Ids
          },
          {
            headers: {
              'Content-type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
    
        console.log(response4.data);
        setDocuments([...documents, ...response4.data])
    
      } catch (error) {
        console.error(error);
      }
    };
   
    const extractTextFromXML = (xmlString) => {
      const regex = /<[^>]+>/g;
      return xmlString.replace(regex, "");
    };

    function removeHtmlTags(htmlText) {
      return htmlText.replace(/<\/?[^>]+(>|$)/g, "");
    }

    const capitalizeFirstLetter = (str) => {
      return str.replace(/\b\w/g, (match) => match.toUpperCase());
    };


    const decodeHtmlEntities = (text) => {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = text;
      return tempElement.textContent || tempElement.innerText || "";
    }; 
 
 const handleShowMore = () => {
      const newVisibleCount = visibleCount + 10;
      setVisibleCount(newVisibleCount);
    };
    
    const handleShowMores = () => {
      handleShowMore();
      resultResponse();
    };
    
    
   
console.log(totalDocuments)
console.log(riskFactors)
console.log(documents)
console.log(encodedIds)

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth <= 768) {
            setVisibleSlides(1);
          } else {
            setVisibleSlides(8);
          }
        };
    
        handleResize();
    
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

return(
<main className="resultPage">
<section className="titleResultContainer">
    <div className="titleContainer">
        <h1>Ищем. Скоро будут результаты</h1>
        <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
    </div>
    <img src={woman} alt="woman" />
</section>



<section className="generelSummary">
    <div className="titleResult">
        <h2>Общая сводка</h2>
        <p>Найдено {totalDocuments.length} вариантов</p>
    </div>
    <div className="contSection">
        <div className="resultSliderContainer">
            <div className="titleSummary">
                <p className="widthPar">Период</p>
                <p>Всего</p>
                <p>Риски</p>
            </div>
{isLoadingSearch ? <div className='blockRisck' > <img
    className="spinner"
    src={spiner2}
    alt="Логотип" /><p>Загружаем данные</p></div> :

            <CarouselProvider className="carouselRisk"
        
        naturalSlideWidth={133}
        naturalSlideHeight={158}
        totalSlides={totalDocuments.length}
        visibleSlides={visibleSlides}
        infinite={true}
      >
            <Slider className="sliderRisk">
            {totalDocuments.map((item, index) => (
      <Slide index={index} key={index}> 
        <div className="slideTotal">
          <p>{new Date(item.date).toISOString().split('T')[0]}</p>
          <p>{item.value}</p>
          <p>{riskFactors[index].value}</p>
        </div>
      </Slide>
    ))}
        </Slider>
        <ButtonBack className="buttonBackRisk"><img src={left} alt="Логотип компании" /></ButtonBack>
        <ButtonNext className="buttonNextRisk"><img src={right} alt="Логотип компании" /></ButtonNext>
        
      </CarouselProvider>
      }
        </div>
    </div>    
</section>

<section className="newsBlock">
    <div className="titleNews">
        <h2>Список документов</h2>
    </div>


    <div className="resultNews">

    {documents.slice(0, visibleCount).map((publication, index) => (
          
       <div className="cardNews" key={index}>
          <div className="newsSubHead">
            <p className="dateHead">
            
            {new Date(publication.ok.issueDate).toISOString().split('T')[0]}
            </p>
            <p className="sourceHead">
           
            <Link to={publication.ok.url} target="_blank"> {publication.ok.source.name}</Link>
            </p>
          </div>

          <div className="titleMainNews">
              <h4> {publication.ok.title.text}</h4>
          </div>

          <div className="categoryNews">
          <p>
          Новости
          </p>
          </div>

          <div className="imageNews">

          </div>

          <div className="mainTextNews">
            
          {capitalizeFirstLetter(removeHtmlTags(decodeHtmlEntities(extractTextFromXML(publication.ok.content.markup))))}
            
          </div>

          <div className="readToSource">
            <Link to={publication.ok.url} target="_blank"><button>Читать в источнике</button></Link>
            <p className="wordCount">
            {publication.ok.attributes.wordCount} слов
            </p>
          </div>
      </div>
       
       
          
        ))}
        <div className="lazyLoad">
        {visibleCount < encodedIds.length && (
          <button onClick={handleShowMores}>Показать больше</button>
         
        )}
     </div>
    </div>
    </section>
    </main>
    );


};


export default ResultPage