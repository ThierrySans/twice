import React, { Component } from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    IndexRoute
} from 'react-router-dom';

var Store = require('../flux/store.jsx');
var Actions = require('../flux/actions.jsx');

class ReviewArea extends Component {

    constructor() {
        super();
        this.state = {
            reviews: [],
            page: 0
        };
    }

    componentDidMount() {
        // load user info and keep it in the store
        this.OnChange = this._onChange.bind(this);
        Store.addChangeListener(this.OnChange);
        Actions.loadReviews(this.props.code, this.state.page);
    }

    componentWillUnmount() {

        Store.removeChangeListener(this.OnChange);

    }

    _onChange() {

        this.setState({reviews: Store.getReviews(), page: 0});
    }

    render() {
        return <div>
            <form id="review_form" onSubmit={(e) => { e.preventDefault(); Actions.submitReview(this.props.code, document.getElementById("content_input").value) }}>
                <div className="box review_area">
                    <label>Write a review</label>

                    <textarea id="content_input" className="comment_area"></textarea>

                    <div className="submit_area">
                        <input type="submit" className="btn" />
                    </div>
                </div>
            </form>
            <div id="review_container">
                {this.state.reviews.map(function (item) { return <Review key={item._id} review={item} />; })}
            </div>

        </div>;
    }
}

class Review extends Component {

    constructor() {
        super();

    }

    render() {
        var delId = "delComment_"+this.props.review._id;
        return <div className="comment flex_col">
            <div className="flex-row flex_spaceb">
                <div className="comment_author flex-row flex_start">
                    <img src="/media/user.png"/>
                        <div className="author_name">{this.props.review.author} says:</div>
                        <div id="comment_time">{new Date(this.props.review.timestamp).toLocaleString()}</div>
                </div>
                <div id={delId} className="del_btn">Delete</div>
            </div>
            <div className="comment_message">{this.props.review.content}</div>
        </div>;
    }
}

module.exports = ReviewArea;