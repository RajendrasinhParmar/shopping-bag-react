var React = require('react');
var ReactDom = require('react-dom');

//CSS requires
require('./css/shoppingItem.css');

//Create TodoItem component
var ShoppingItem = React.createClass({
    render: function(){
        return(
            <li>
                <div className="shopping-item">
                    <span className="item-name" ref="thisItem">{this.props.item.itemId}</span>
                    <span className="item-name" ref="thisItem">{this.props.item.name}</span>
                    <span className="item-name" ref="thisItem">{this.props.item.price}</span>
                    <span className="item-remove" onClick={this.handleDelete}> Add </span>
                </div>
            </li>
        );
    },

    //Custom functions
    handleDelete: function(){
        this.props.onAdd(this.props.item);
    }
});

module.exports = ShoppingItem;
