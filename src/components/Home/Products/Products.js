import React from 'react';
import { Container, Row } from 'react-bootstrap';
import useProducts from '../../../hooks/useProducts';
import Product from '../../Product/Product';

const Products = () => {
    const { products } = useProducts();
    return (
        <div>
            <h3>Total Products: {products?.length}</h3>
            <Container>
                <Row xs={1} md={2} className="g-4">
                    {
                        products.map(prd => <Product key={prd.id} product={prd}></Product>)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Products;