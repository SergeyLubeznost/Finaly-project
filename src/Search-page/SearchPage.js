import React, { useState, useContext,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './SearchPage.css'
import './375pxSearchPage.css'
import Document from "./Document.svg"
import Folders from "./Folders.svg"
import Arrow from "./Rectangle 32.svg"
import ManWithКocket from "./Group 1171274244.svg"


const SearchPage = () => {
  const {accessToken, settotalDocuments, setriskFactors,setDocuments, setIsLoadingSearch, setEncodedIds} = useContext(AuthContext);
  const [numberINN, setNumberINN] = useState('');
  const [tonality, setTonality] = useState('');
  const [numberOfDocuments, setNumberOfDocuments] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState({message: '' });
  const [errorLimit, setErrorLimit] = useState({message: '' });
  const [errorDate, setErrorDate] = useState({message: '' });
  const [bik, setBik] = useState(true);
  const [docLimit, setDocLimit] = useState(true);
  const [dateRangeValid, setDateRangeValid] = useState(true);
  const [startDateType, setStartDateType] = useState("text");
const [endDateType, setEndDateType] = useState("text");
  const navigate = useNavigate();

  useEffect(() => {
    const isValidINN = () =>{
      if (!numberINN.length) {
        setBik(true);
      }else if (/[^0-9]/.test(numberINN)) {
      setError({message: 'ИНН может состоять только из цифр' });
     // setIsFormValid(true);
     setIsFormValid(false);
     setBik(false)
      return false;
    } else if (numberINN.length !== 10) {
      setError({ message: 'ИНН может состоять только из 10 цифр' });
      //setIsFormValid(true);
      setIsFormValid(false);
      setBik(false)
      return false;
    } else {
      const coefficients = [2, 4, 10, 3, 5, 9, 4, 6, 8];
      const sum = numberINN
        .split('')
        .slice(0, 9)
        .reduce((acc, digit, index) => acc + digit * coefficients[index], 0);
      setBik(true)
      const controlDigit = sum % 11 % 10;
      if (parseInt(numberINN[9], 10) === controlDigit) {
        return setBik(true);
      } else {
        setError({ message: 'Неверное контрольное число в ИНН' });
       // setIsFormValid(true);
       setIsFormValid(false);
        return setBik(false);
      }
    }
  }

const isValidLimit = () => {
  parseInt(numberOfDocuments)
  if (numberOfDocuments < 0 || numberOfDocuments > 1000) {
    setErrorLimit({ message: 'недопустимое значение' });
    setIsFormValid(false);
    return setDocLimit(false);
  }
  if (numberOfDocuments) {
    setDocLimit(true);
  }
}
const emptyForm = () =>{
    if (numberOfDocuments && startDate && endDate && numberINN) {
      setIsFormValid(true);
      setDocLimit(true)
    } else {
      setIsFormValid(false);
      setBik(true)
      //setDocLimit(false)
    }
  }

  const isValidDateRange = () => {
    const currentDate = new Date().toISOString().slice(0, 10); 
    
    if (startDate > currentDate || endDate > currentDate) {
      setErrorDate({ message: ' Выберите прошедшую или текущую дату.' });
      setIsFormValid(false);
      return setDateRangeValid(false);
    }
    
    if (startDate > endDate) {
      setErrorDate({ message: 'Начальная дата не может быть позже конечной даты.' });
      setIsFormValid(false);
      return setDateRangeValid(false);
    }
   
    setDateRangeValid(true);
    setErrorDate({ message: '' });
  };

    isValidDateRange()
    emptyForm()
    isValidINN()
    isValidLimit()
  }, [numberOfDocuments, startDate, endDate, numberINN]);




  const startDates = startDate+"T00:00:00+03:00";
  const endDates = endDate+"T23:59:59+03:00"

 

  const dataReq ={
    issueDateInterval: {
      startDate: startDates,
      endDate: endDates,
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: "company",
            sparkId: null,
            entityId: null,
            inn: numberINN,
            maxFullness: true,
            inBusinessNews: null,
          },
        ],
        onlyMainRole: true,
        tonality: "any",
        onlyWithRiskFactors: false,
        riskFactors: {
          and: [],
          or: [],
          not: [],
        },
        themes: {
          and: [],
          or: [],
          not: [],
        },
      },
      themesFilter: {
        and: [],
        or: [],
        not: [],
      },
    },
    searchArea: {
      includedSources: [],
      excludedSources: [],
      includedSourceGroups: [],
      excludedSourceGroups: [],
    },
    attributeFilters: {
      excludeTechNews: true,
      excludeAnnouncements: true,
      excludeDigests: true,
    },
    similarMode: "duplicates",
    limit: numberOfDocuments,
    sortType: "sourceInfluence",
    sortDirectionType: "desc",
    intervalType: "month",
    histogramTypes: ["totalDocuments", "riskFactors"],
  };


    const requestBodyJSON = JSON.stringify(dataReq)

  console.log(startDates)
  console.log(endDates)
  console.log(requestBodyJSON)


  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate('/resultPage');

   
    try {
      setIsLoadingSearch(true);
      const response = await axios.post(
        'https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', 
        requestBodyJSON,
        {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      console.log(response.data);
      const { data } = response.data;

     
      
      const totalDocuments = data.find(item => item.histogramType === "totalDocuments").data;
      const riskFactors = data.find(item => item.histogramType === "riskFactors").data;
     
    
      
      settotalDocuments( totalDocuments);
      setriskFactors(riskFactors);
  
    
      const response2 = await axios.post(
        'https://gateway.scan-interfax.ru/api/v1/objectsearch', 
        requestBodyJSON,
        {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
        );

      console.log(response2.data);
      const encodedIds = response2.data.items.map(item => item.encodedId);
      console.log(encodedIds);
      const first10Ids = encodedIds.slice(0, numberOfDocuments <= 10 ? numberOfDocuments : 10);
      console.log(first10Ids);
      setEncodedIds(encodedIds)

      const response3 = await axios.post(
        'https://gateway.scan-interfax.ru/api/v1/documents', 
        {
          ids: first10Ids
        },
        {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
        );

   
      console.log(response3.data);
      setDocuments(response3.data)
      setIsLoadingSearch(false);
    } catch (error) {
      console.error(error);
      setIsLoadingSearch(false);
    }
  };

  return (
    <div className="searchContainer">
      <div className="searchTitleContainer">
        <div className="titleSearch">
          <h1 className='titleH2'>Найдите необходимые данные в пару кликов.</h1>
          <p className='subTitle'>Задайте параметры поиска. <br />
            Чем больше заполните, тем точнее поиск</p>
        </div>
        <img
          className='document'
          src={Document}
          alt="Логотип"
        />
        <div className="imageContainer">
          <img
            src={Document}
            alt="Логотип 1"
          />
          <img
            className='folders'
            src={Folders}
            alt="Логотип 2"
          />
        </div>
      </div>

      <div className="searchFormContainer">
      <form className='formSerach' onSubmit={handleSubmit} >
            <div className="importantFields">
            <label className='numberINN' htmlFor="numberINN">ИНН компании*</label>

            <input 
            className={` ${ bik ? "borderForm" : "borderInput"}`} 
            type="text"  
            required id='numberINN' 
            maxLength={10}
             placeholder='10 цифр' 
              value={numberINN}
               onChange={(event) => {
                setNumberINN(event.target.value);}} />  
                
             { bik ? null : <p className='redErorr'>{error.message}</p>}
           
            <label className='tonality' htmlFor="tonality" >Тональность</label> 

            <img
              className='arrow' 
              src={Arrow}
              alt="Логотип к"/>
           <select
            className="tonalitySelect"
             id="tonality" 
              value={tonality} 
              onChange={(event) => {
              setTonality(event.target.value);}}>
                    <option>позитивная</option>
                    <option>любая</option>
                    <option>негативная</option>
            </select>

            <label
             className='numberOfDocuments'
              htmlFor="numberOfDocuments">
                Количество документов в выдаче*
                </label>

            <input
             className={` ${ docLimit ? "borderForm" : "borderInput"}`}
              type="number" 
              min="0" max="1000"
               maxLength={4}
                required id="numberOfDocuments" 
                placeholder="От 1 до 1000" 
                 value={numberOfDocuments} 
                 onChange={(event) => {
                  setNumberOfDocuments(event.target.value);}}/>
                   { docLimit ? null : <p className='redErorr'>{errorLimit.message}</p>}
            
            <label >Диапазон поиска*</label>
        <div className="dateContainer">
          
        <input
         className={` ${dateRangeValid ? "borderForm" : "borderInput"}`}
          type={startDateType}
            placeholder="Дата начала"
             required
              id="startDate"
                value={startDate}
                 onChange={(event) => {
                  setStartDate(event.target.value);
                   }}
                     onFocus={() => {
                      setStartDateType("date");
                        }}
                      onBlur={() => {
                        setStartDateType("text");
                          }}
          />

                    <input
                      className={`searchRange ${dateRangeValid ? "borderForm" : "borderInput"}`}
                        placeholder="Дата конца"
                          type={endDateType}
                          required
                            id="endDate"
                              value={endDate}
                              onChange={(event) => {
                                setEndDate(event.target.value);
                                  }}
                                  onFocus={() => {
                                    setEndDateType("date");
                                      }}
                                    onBlur={() => {
                                        setEndDateType("text");
                                            }}
                    />
      
  
        </div>
       <div className="errorBlock"> { dateRangeValid ?  null : <p className='redErorrDate dateMrg'>{errorDate.message}</p>}
       </div>
            <button className='displayNone searchButton'  type="submit" disabled={!isFormValid}>Войти</button>
            <p className='displayNone paragImportant' >* Обязательные к заполнению поля</p>
            
            </div>


            <div className="checkboxContainer">
                <div>
                    <input className='checkbox' type="checkbox" id='signOfMaximumCompleteness1' defaultChecked={true} />
                    <span className="fake"></span>
                    <label className='label' htmlFor="signOfMaximumCompleteness1">Признак максимальной полноты</label>
                </div>
                <div>
                    <input className='checkbox' type="checkbox" id='signOfMaximumCompleteness2' defaultChecked={true}/>
                    <span className="fake"></span>
                    <label className='label' htmlFor="signOfMaximumCompleteness2">Упоминания в бизнес-контексте</label>
                </div>
                <div>
                    <input className='checkbox' type="checkbox" id='signOfMaximumCompleteness3' defaultChecked={true}/>
                    <span className="fake"></span>
                    <label className='label' htmlFor="signOfMaximumCompleteness3">Главная роль в публикации</label>
                </div>
                <div className='labelColor'>
                    <input className='checkbox labelColor' type="checkbox" id='publicationsWithRiskFactorsOnly' disabled={true} />
                    <span className="fake"></span>
                    <label className='label' htmlFor="publicationsWithRiskFactorsOnly" >Публикации только с риск-факторами</label>
                </div>
                <div className='labelColor'>
                    <input className='checkbox' type="checkbox" id='IncludeTechnicalMarketNews' disabled={true} />
                    <span className="fake"></span>
                    <label className='label' htmlFor="IncludeTechnicalMarketNews" >Включать технические новости рынков</label>
                </div>
                <div>
                    <input className='checkbox' type="checkbox" id='IncludeAnnouncementsAndCalendars' defaultChecked={true}/>
                    <span className="fake"></span>
                    <label className='label' htmlFor="IncludeAnnouncementsAndCalendars">Включать анонсы и календари</label>
                </div>
                <div className='labelColor'>
                    <input className='checkbox' type="checkbox" id='IncludeNewsReports' disabled={true} />
                    <span className="fake"></span>
                    <label className='label' htmlFor="IncludeNewsReports" >Включать сводки новостей</label>
   
           </div>
                  <div className="buttonContainer">    
                        <button className='searchButton' type="submit" disabled={!isFormValid}>Войти</button>
                        <p>* Обязательные к заполнению поля</p>
                  </div> 
            </div>

</form>
        <img
          className='manWithКocket'
          src={ManWithКocket}
          alt="Логотип"
        />
      </div>
    </div>
  )
};

export default SearchPage;