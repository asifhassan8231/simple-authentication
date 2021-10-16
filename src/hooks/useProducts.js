import { useEffect, useState } from "react"

const useProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://mocki.io/v1/e11bac28-026f-4ddd-ad38-f0e50c7a52f1')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return {
        products
    }
}
export default useProducts;