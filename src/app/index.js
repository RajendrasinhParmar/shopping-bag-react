var React = require('react');
var ReactDOM = require('react-dom');
import axios from 'axios';
import { Router, Route, browserHistory, Link } from 'react-router';

//Module requires
var ShoppingItem = require('./shoppingItem');
var CartItem = require('./cartItem');

//CSS requires
require('./css/index.css');


//SETUP ROUTING
var App = React.createClass({
    render: function(){
        return(
            <Router history={browserHistory}>
                <Route path={"/"} component={ShoppingComponent}></Route>
            </Router>
        );
    }
});

//Create a component
var ShoppingComponent = React.createClass({
    getInitialState: function(){
        return {
            items: [],
            cartItems: []
        }
    }, //getInitialState
    render: function(){
        var items = this.state.items;
        items = items.map(function(item, index){
            return(<ShoppingItem key={index} item={item} onAdd={this.onAdd} />);
        }.bind(this));
        var cartItems = this.state.cartItems;
        cartItems = cartItems.map(function(item, index){
            return(<CartItem key={index} item={item} onDelete={this.onDelete} />);
        }.bind(this));
        return(
            <div>
                <h3>Shopping List</h3>
                <div id="shopping-list">
                    <ul>{items}</ul>
                </div>
                <h3>Cart</h3>
                <div id="shopping-list">
                    <ul>{cartItems}</ul>
                </div>
            </div>
        );
    }, //render

    componentDidMount: function () {
        axios.get('http://localhost:3000/items')
        .then( (response) => {
          this.setState({
              items: response.data.items,
              cartItems: []
          })
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //Custom functions
    onDelete: function(item){
        var updatedCart = this.state.cartItems.filter(function(val, index){
            return item !== val;
        });
        var updatedItems = this.state.items;
        updatedItems.push(item);
        this.setState({
            items: updatedItems,
            cartItems: updatedCart
        })
    },

    onAdd: function(item){
        var updatedItems = this.state.items.filter(function(val, index){
            return item !== val;
        });
        var updatedCart = this.state.cartItems;
        updatedCart.push(item);
        this.setState({
            items: updatedItems,
            cartItems: updatedCart
        })
    }

});

ReactDOM.render(<App />, document.getElementById('shopping-wrapper'));
