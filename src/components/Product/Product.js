import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './Product.css';

const Product = ({ product }) => {
    const { price, title, image, rating, id } = product;
    const url = `/proudct/${id}`;
    const history = useHistory();
    const handleViewDetails = () => {
        history.push(url);
    }
    return (
        <Col>
            <Card>
                <Card.Img className="mx-auto img-thumbnail image-resize" variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>

                    <h4>Price: ${price}</h4>
                    <small><span>Rating: {rating.rate} </span><span>({rating.count})</span></small>

                </Card.Body>
                <button className="btn btn-primary" onClick={handleViewDetails}>View Details</button>
            </Card>
        </Col>
    );
};

export default Product;