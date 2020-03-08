import React, { Component } from "react";
import './styles.css'
class Menu extends Component {
    constructor(){
        super();
        this.state = {currentPage: ''};
    }


    render(){
        return (
            <div className="Menu">
                <ul className="Menu-List">
                    <li>Hi</li>
                    <li>George</li>
                    <li>Its</li>
                    <li>Tim</li>
                </ul>
            </div>
        );
    }
}

export default Menu;