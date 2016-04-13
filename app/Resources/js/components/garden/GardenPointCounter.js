var React = require('react');
var ReactDOM = require('react-dom');

var GardenPointCounter = React.createClass({
    getInitialState: function() {
        return {
            points: this.props.points
        };
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return (
            nextProps.points !== this.props.points ||
            nextState.points !== this.state.points
        );
    },

    componentDidUpdate: function (prevProps) {
        if (!prevProps.points && this.props.points) {
            //ReactDOM.findDOMNode(this.refs);
        }
        var node = ReactDOM.findDOMNode(this);
        node.classList.add('flash');
        node.addEventListener("webkitAnimationEnd", this.endAnimation);
    },

    componentDidMount :function(){
        var node = ReactDOM.findDOMNode(this);
        node.classList.add('animated','fadeInDown');
        node.addEventListener("webkitAnimationEnd", this.endAnimation);
    },

    componentWillUnmount :function(){
        var node = ReactDOM.findDOMNode(this);
        node.removeEventListener("webkitAnimationEnd", this.endAnimation);
    },

    endAnimation:function(e){
        e.target.classList.remove('fadeInDown','flash');
        e.target.style.animationDelay = 'initial';
    },

    render() {
        return (
            <div className="gardenPointCounter">
                <span><i className="ion-battery-charging"></i> {this.props.points}</span>
            </div>
        );
    }
});

module.exports = GardenPointCounter;