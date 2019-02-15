import React, {Component} from 'react'
import axios from 'axios';

export default class CreateProduct  extends Component{

    constructor(props){
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductPostedBy = this.onChangeProductPostedBy.bind(this);
        this.onChangeProductImage = this.onChangeProductImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        
        this.state = {
            product_name:'',
            product_price:'',
            product_status:'Avail',
            product_posted_by:'',
            product_image:null
        }
    }

    onChangeProductName(e){
        this.setState({
            product_name:e.target.value
        });
    }

    onChangeProductPrice(e){
        this.setState({
            product_price:e.target.value
        });
    }

    onChangeProductPostedBy(e){
        this.setState({
            product_posted_by:e.target.value
        });
    }

    onChangeProductImage(e){
        this.setState({
            product_image:e.target.files[0]
        });
    }

    onSubmit(e){
        e.preventDefault();
        console.log('Form submitted');
        console.log(`Product desc: ${this.state.product_name}`);
        console.log(`Product desc: ${this.state.product_price}`);
        console.log(`Product desc: ${this.state.product_posted_by}`);
        console.log(`Product desc: ${this.state.product_image}`);

        const newProduct={
            product_name:this.state.product_name,
            product_price:this.state.product_price,
            product_status:this.state.product_status,
            product_posted_by:this.state.product_posted_by,
            product_image:this.state.product_image
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
       
        axios.post('http://localhost:4000/products/add', newProduct, config)
            .then(res => console.log(res.data));

        this.setState({
            product_name:'',
            product_price:'',
            product_status:'Avail',
            product_posted_by:'',
            product_image:null
        });
    }
    render(){
        return (
            <div style={{marginTop:20}}>
                    <h3>Add your product to sell</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label> Name:</label>
                            <input  type="text" 
                                    className="form-control" 
                                    value={this.state.product_name}
                                    onChange={this.onChangeProductName}
                                    />
                        </div>
                        <div className="form-group">
                            <label> Price(USD):</label>
                            <input  type="text" 
                                    className="form-control" 
                                    value={this.state.product_price}
                                    onChange={this.onChangeProductPrice}
                                    />
                        </div>
                        <div className="form-group">
                            <label> Posted By:</label>
                            <input  type="text" 
                                    className="form-control" 
                                    value={this.state.product_posted_by}
                                    onChange={this.onChangeProductPostedBy}
                                    />
                        </div>
                        <div className="form-group">
                        <input type="file" name="myImage"  onChange= {this.onChangeProductImage} />
                        </div>
                        
                       <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-primary"></input>
                       </div> 
     
                    </form>
            </div>
        )
    }
}