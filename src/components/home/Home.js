import React, {useState, useEffect} from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, Col, Container, Row } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './home-style.css'

import Slider from 'react-slick';

import {TravelData} from '../../asset/TravelData'
import {AreaData} from '../../asset/TravelData'
import { Link } from 'react-router-dom';


const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 3000,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        arrows:true,
        autoplaySpeed:3000,
        autoplay:true,
        vertical:true,
        verticalSwiping: true,
        pauseOnHover:true,
      };

      const [selectedPlaceId, setSelectedPlaceId] = useState(1)
      const [placeArea, setPlaceArea] = useState([])
      const [areaData, setAreaData] = useState(AreaData)
    //   console.log(areaData[0].placeName)
      
      const handleAreaChange = (id) =>{
        setSelectedPlaceId(id)
    }
      

      useEffect(() => {
        let data = TravelData.find(td => td.id === selectedPlaceId)
        setPlaceArea(data)


      }, [selectedPlaceId])

    return (
        <>
             <Container fluid={true} className="home__section p-0">
                    <div className="overlay">
                        <Container className="bannerContent">
                            <Row>
                                <Col md={4}>
                                <div className="home__content">
                                    <h1 className="home__title">{placeArea.placeName}</h1>
                                    <p className="home__des">{placeArea.description}</p>
                                    <Link to={`/place/${placeArea.id}`}><button className="home__btn"> Booking <FontAwesomeIcon icon={faArrowRight} /></button> </Link> 
                                </div>
                                </Col>
                                <Col md={8}>
                                    <div className="slider__section">
                                   
                                        <div className="slider__single " onClick={() => handleAreaChange(areaData[0].id)}>
                                        <div className="overlay-img active"></div>
                                            <img className="slider__single-img" src={areaData[0].placeImg} alt=""/>
                                            <h4 className="slider__single-text">{areaData[0].placeName}</h4>
                                        </div>
                                        <div className="slider__single" onClick={() => handleAreaChange(areaData[1].id)}>
                                           <div className="overlay-img"></div>
                                            <img className="slider__single-img" src={areaData[1].placeImg} alt=""/>
                                            <h4 className="slider__single-text">{areaData[1].placeName}</h4>
                                           
                                        </div>
                                        <div className="slider__single"  onClick={() => handleAreaChange(areaData[2].id)}>
                                        <div className="overlay-img"></div>
                                            <img className="slider__single-img" src={areaData[2].placeImg} alt=""/>
                                            <h4 className="slider__single-text">{areaData[2].placeName}</h4>
                                        </div>
                                        
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Container>
        </>
    );
};

export default Home;