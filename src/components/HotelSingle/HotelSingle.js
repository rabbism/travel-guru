import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './hotelSingle-style.css'

const HotelSingle = (props) => {
    const {img, title,facility1,facility2,facility3, review, price} = props.hotel
    // console.log(props.hotel)
    return (
        <div className="d-flex mb-3">
            <img src={img} className="hotel__img" alt=""/>
                            <div className="hotel__content">
                                <h3 className="hotel__title">{title}</h3>
                                <p className="hotel__facility">{facility1}</p>
                                <p className="hotel__facility">{facility2}</p>
                                <p className="hotel__facility">{facility3}</p>
                                <div className="hotel__rate-price d-flex">
                                    <div className="hotel__rate d-flex mr-3">
                                        <FontAwesomeIcon className="hotel__rate-icon" icon={faStar} />
                                        <h6>{review}</h6>
                                    </div>
                                    <div className="hotel__price d-flex">
                                        <h6>${price}</h6>/ <span className="hotel__price-night">Night</span>
                                    </div>
                                </div>
                                
                            </div>
        </div>
    );
};

export default HotelSingle;