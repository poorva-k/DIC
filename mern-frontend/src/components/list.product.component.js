import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Product = props=>(
    <tr>
        <td >{props.product.product_name}
        <br/>{'$' + props.product.product_price}
        <br/>{props.product.product_status}
        </td>
        <td>
            <Link to={"/edit/" + props.product._id}>Edit</Link>
        </td>
    </tr>
)


export default class ProductsList extends Component{


    constructor(props){
        super(props);
        this.state= {products:[]};
    }

    componentDidMount(){
        axios.get('http://localhost:4000/products/')
        .then(response =>{
            this.setState({products:response.data});
        })
        .catch(function(error){
            console.log(error);
        })
    }

    productList(){
        return this.state.products.map(function(currentProduct,i){
            return <Product product={currentProduct} key={i}/>
        });
    }
    render(){
        return (
            <div>
                    <h3>Buy Products</h3>
                    <table className= "table table-striped" style={{marginTop:20}}>
                        
                        <tbody>
                            {this.productList()}
                        </tbody>
                    
                    </table>
            </div>
        )
    }
}