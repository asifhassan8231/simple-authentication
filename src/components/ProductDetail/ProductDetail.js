import React from 'react';
import { Container } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import useProducts from '../../hooks/useProducts';

const ProductDetail = () => {
    const { productId } = useParams();
    const { products } = useProducts();
    const product = products.find(prd => prd.id === parseInt(productId));
    const history = useHistory();
    const handleAddToCart = () => {
        history.push('/shipping');
    }
    return (
        <Container>
            <div className="row mt-5" >
                <div className="col"><img className="img-fluid w-50" src={product?.image} alt="" /></div>
                <div className="col"><h2>Product Id: {productId}</h2>
                    <h3>{product?.title}</h3>
                    <h4>{product?.description}</h4>
                    <h6>Price: ${product?.price}</h6>
                    <button className="btn btn-info" onClick={handleAddToCart}>Add to cart</button></div>
            </div>
        </Container>
    );
};

export default ProductDetail;