import React, {Component} from 'react';
import axios from 'axios';

export default class EditProduct extends Component {

    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductPostedBy = this.onChangeProductPostedBy.bind(this);
        this.onChangeProductStatus = this.onChangeProductStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            product_name: '',
            product_price: '',
            product_posted_by: '',
            product_status: 'Avail'
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    product_name: response.data.product_name,
                    product_price: response.data.product_price,
                    product_posted_by: response.data.product_posted_by,
                    product_status: response.data.product_status
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    onChangeProductName(e) {
        this.setState({
            product_name: e.target.value
        });
    }

    onChangeProductPrice(e) {
        this.setState({
            product_price: e.target.value
        });
    }

    onChangeProductPostedBy(e) {
        this.setState({
            product_posted_by: e.target.value
        });
    }

    onChangeProductStatus(e) {
        this.setState({
            product_status: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            product_name: this.state.product_name,
            product_price: this.state.product_price,
            product_posted_by: this.state.product_posted_by,
            product_status: this.state.product_status
        };
        axios.post('http://localhost:4000/products/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Update Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.product_name}
                                onChange={this.onChangeProductName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.product_price}
                                onChange={this.onChangeProductPrice}
                                />
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.product_status}
                                onChange={this.onChangeProductStatus}
                                />
                    </div>
                    <div className="form-group">
                        <label>Posted By: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.product_posted_by}
                                onChange={this.onChangeProductPostedBy}
                                />
                    </div>
                    <div className="form-group">
                        
                        
                        
                        
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Update Product" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}