import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './hotel-style.css'

import { HotelData } from '../../asset/TravelData'
import HotelSingle from '../HotelSingle/HotelSingle';
import GoogleMapReact from 'google-map-react';

const HotelPage = (props) => {
    const [hotels, setHotels] = useState(HotelData)
    // console.log(hotels)


    return (
        <div className="hotel__container">
            <Container>
                <Row>
                    <Col md={8}>
                        <div className="hotel__section">
                            <h2>Stay in Cox’s Bazar</h2>
                            {
                                hotels.map(hotel => <HotelSingle key={hotel.id} hotel={hotel} />)
                            }
                        </div>
                    </Col>
                    <Col md={4}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyBlVv_8T1P8L_1ps2nx3bDI8YfYP9HxXdo" }}
                            defaultCenter={{
                                lat: 21.4508836,
                                lng: 91.9328616
                            }}
                            defaultZoom={8}
                        >
                             <div
                                lat={21.4508836}
                                lng={91.9328616} 
                            > <h4>Cox’s Bazar</h4> </div>
                        </GoogleMapReact>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HotelPage;