import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedValue = localStorage.getItem('isLoggedIn');
    return storedValue ? JSON.parse(storedValue) : false;
});

useEffect(() => {
  localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
}, [isLoggedIn]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSearch, setIsLoadingSearch] = useState(true);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [totalDocuments, settotalDocuments] = useState ([])
    const [riskFactors, setriskFactors] = useState ([])
    const [encodedIds, setEncodedIds] = useState ([])
    const [token, setToken] = useState ([])

    const [documents, setDocuments] = useState ([])

  
    return (
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading, setIsLoading, accessToken, setAccessToken, totalDocuments, settotalDocuments, riskFactors, setriskFactors, documents, setDocuments, isLoadingSearch, setIsLoadingSearch, encodedIds, setEncodedIds, token, setToken}}>
        {children}
      </AuthContext.Provider>
    );
  };