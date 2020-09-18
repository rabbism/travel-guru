import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { TravelData } from '../../asset/TravelData';
import './bookingdetails-style.css'

const BookingDetails = () => {
    const [bookingInfo, setBookingInfo] = useState([])
    const { register, handleSubmit, errors } = useForm()
    const { placeId } = useParams()
    const data = TravelData.find(td => td.id === Number(placeId))


    const onSubmit = (data) => {
        setBookingInfo(data);
    };
    console.log(bookingInfo)


    return (
        <Container fluid={true} className="home__section p-0">
            <div className="overlay">
                <Container className="bannerContent">
                    <Row>
                        <Col md={6}>
                            <div className="home__content">
                                <h1 className="home__title">{data.placeName}</h1>
                                <p className="home__des">{data.description}</p>

                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="booking__area">
                                <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                                    <label className="label">Origin</label>
                                    <input className="form-control input-style" placeholder="Dhaka" name="origin" ref={register({ required: true })} />
                                    {errors.name && <small className="text-danger">Origin Name is required</small>}<br />

                                    <label className="label">Destination</label>
                                    <input className="form-control input-style" placeholder="Cox's Bazar" name="detination" ref={register({ required: true })} />
                                    {errors.name && <small className="text-danger">Destination name is required</small>}<br />
                                    <div className="date__section d-flex justify-content-between mb-4">
                                        <div className="start__date">
                                        <label className="label">From</label>
                                        <input className="form-control input-style" type="date" name="startdate" id="" ref={register({ required: true })}/>
                                        {errors.startdate && <small className="text-danger">Start date is required</small>}<br />
                                        </div>

                                        <div className="end__date">
                                        <label className="label">To</label>
                                        <input className="form-control input-style" type="date" name="enddate" id="" ref={register({ required: true })}/>
                                        {errors.enddate && <small className="text-danger">End date name is required</small>}<br />

                                        </div>
                                    
                                    </div>

                                    <Link to="/hotelpage"> <button className="booking-btn">Start Booking</button></Link> 
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Container>
    );
};

export default BookingDetails;