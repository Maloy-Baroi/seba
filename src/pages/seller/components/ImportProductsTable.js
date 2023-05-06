import productsTableStyle from "@/styles/productTable.module.css";
import {useState, useEffect} from "react";
import {getImportedProducts} from "@/pages/api/app_data";

const ProductsTable = ({searchValue}) => {
    const [products, setProducts] = useState([]);

    const searchOption = () => {
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()) || product.category.toLowerCase().includes(searchValue.toLowerCase()));
        setProducts(filteredProducts);
    }

    const fetchImportedProducts = async () => {
        const allImported = await getImportedProducts()
        setProducts(allImported)
    }

    useEffect(() => {
        if (searchValue) {
            searchOption()
        } else {
            fetchImportedProducts().then(r => true)
        }
    }, [searchValue])

    const onHandle = (id) => {
        let quantity = parseInt(prompt("Quantity?: "));
        const sellcard = JSON.parse(localStorage.getItem('sellcard') || '[]');
        const item = {id, quantity};
        const existProduct = sellcard.find(product => product.id === id)
        if (existProduct) {
            existProduct.quantity = parseInt(existProduct.quantity) + quantity;
            localStorage.setItem('sellcard', JSON.stringify(sellcard))
        } else {
            sellcard.push(item);
            localStorage.setItem('sellcard', JSON.stringify(sellcard));
        }
    }

    return (
        <>
            <div className={"card " + productsTableStyle.cardBackground}>
                <div className="card-body">
                    <h5 className="card-title mb-4">
                        <b>All Products</b>
                    </h5>
                    <div className={"mt-3"}>
                        <table className={productsTableStyle.table}>
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Generic</th>
                                <th scope="col">Quantity Left</th>
                                <th scope="col">Shelf</th>
                                <th scope="col">Expiry Date</th>
                                <th scope="col">Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                products ?
                                products.map((item, index) => (
                                    <tr key={item.id}>
                                        <td data-label="Name">
                                            <p className={productsTableStyle.itemName}>{item.name} </p>
                                            <p>({item.unit})</p>
                                            <p className={productsTableStyle.brandName}>
                                                ({item.brand})
                                            </p>
                                        </td>
                                        <td data-label="Generic" style={{
                                            width: "148px",
                                            whiteSpace: "pre-wrap",
                                        }}>
                                            {item.category}
                                        </td>
                                        <td data-label="Quantity Left">{item.quantity}</td>
                                        <td data-label="Brand">
                                            Shelf: {item.shelf.split(", ")[0]} <br/>
                                            Row: {item.shelf.split(", ")[1]} <br/>
                                            Column: {item.shelf.split(", ")[2]}
                                        </td>
                                        <td data-label="Expiry Date">{item.expiry_date}</td>
                                        <td data-label="Price">
                                            <b>
                                                &#2547; {item.minimum_selling_price}
                                            </b>
                                        </td>
                                    </tr>
                                ))
                                : <tr></tr>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductsTable;
