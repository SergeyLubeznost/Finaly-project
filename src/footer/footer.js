import "./footer.css"
import "./375pxfooter.css"
import logoFooter from "./eqw 1.svg"




const Footer =()=>{
  return(
    
      
        <footer>
            
                <img className='footer-logo' src={logoFooter} alt="Логотип компании" />
            
                <div className="conteinerCopy">
                    <div className="geoposition">
                          <p>г. Москва, Цветной б-р, 40
                          <br />
                            +7 495 771 21 11
                          <br />
                              info@skan.ru</p>
                    </div>
                    <div className="copyright">
                              <p>Copyright 2022</p>
                    </div>
                </div>
        </footer>
    
  )
}

export default Footer