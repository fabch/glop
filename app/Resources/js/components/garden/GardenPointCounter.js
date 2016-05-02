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
        var node = ReactDOM.findDOMNode(this.refs.pointCounter);
        node.classList.add('flash');
        node.addEventListener("webkitAnimationEnd", this.endAnimation);
    },

    componentDidMount :function(){
        var node = ReactDOM.findDOMNode(this.refs.pointCounter);
        node.classList.add('animated','fadeInDown');
        node.addEventListener("webkitAnimationEnd", this.endAnimation);
    },

    componentWillUnmount :function(){
        var node = ReactDOM.findDOMNode(this.refs.pointCounter);
        node.removeEventListener("webkitAnimationEnd", this.endAnimation);
    },

    endAnimation:function(e){
        e.target.classList.remove('fadeInDown','flash');
        e.target.style.animationDelay = 'initial';
    },

    render() {
        return (
            <div className="gardenPointCounterWrapper">
                <div className="gardenPointCounter">
                    <span className="topRight">
                        <span ref={'pointCounter'} >{this.props.points} <i className="ion-battery-charging"></i></span>
                    </span>
                    <span className="topCenter">

                    </span>
                </div>
            </div>
        );
    }
});

module.exports = GardenPointCounter;