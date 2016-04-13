var React = require('react'),
    ReactDOM = require('react-dom');

var GardenItemActions = require('../../actions/GardenItemActions');
var AnimationMixin = require('../../mixins/AnimationMixin');
var Classie = require('classie');
var interact = require('interact');
var update = require('react-addons-update');

var GardenItemContent = React.createClass({

    render: function() {
        return (
            <span>
                <i className={this.props.item.picto}></i>
                <h3>{this.props.item.name}</h3>
                <small>{this.props.item.price}</small>
            </span>
        );
    }
});

var GardenItem = React.createClass({

    mixins :[AnimationMixin],

    getInitialState: function() {
        return {
            item     : this.props.item,
            points   : this.props.points,
            isActive : false,
            isDragged: false
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            isActive : nextProps.points >= nextProps.item.price
        });
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (prevState.isActive != this.state.isActive) {
            if(!this.state.isDragged) {
                this.addAnimationStyle(ReactDOM.findDOMNode(this), ['animated','flipInX'], 0, 1000);
            }
        }
    },

    componentWillMount :function(){
        this.setState({
            isActive : this.state.points >= this.state.item.price
        });
    },

    componentDidMount :function(){
        var that = this;

        this.addAnimationStyle(ReactDOM.findDOMNode(this), ['animated','flipInX'], this.props.index * 100, 1000);
        interact(ReactDOM.findDOMNode(this)).draggable({
            // enable inertial throwing
            //inertia: true,
            //restrict: {
            //    restriction: "parent",
            //    endOnly: true,
            //    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            //},
            // enable autoScroll
            //autoScroll: true,

            onstart:function(event){
                GardenItemActions.gardenSelectItem(that.props.item);
            },

            // call this function on every dragmove event
            onmove: function(event) {
                var target = event.target,
                    // keep the dragged position in the data-x/data-y attributes
                    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                // translate the element
                target.style.width =
                    target.style.transform =
                        'translate(' + x + 'px, ' + y + 'px)';

                // update the posiion attributes
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },


            onend: function (event) {
                event.target.style.transform ='';
                event.target.removeAttribute('data-x');
                event.target.removeAttribute('data-y');
                GardenItemActions.gardenReleaseItem(that.props.item);
            }
        });
    },

    handleMouseDown:function(sme){
        GardenItemActions.gardenFocusItem(this.props.item);
        this.setState({isDragged:true});
    },

    handleMouseUp:function(sme){
        this.setState({isDragged:false});
    },

    render: function() {
        return (
            <div
                tabIndex={this.props.index}
                className={'gardenItem ' + this.props.item.cl + ( this.state.isActive ? '' : ' disabled') }
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
            >
                <GardenItemContent item={this.props.item} />
            </div>
        );
    }
});

module.exports = GardenItem;