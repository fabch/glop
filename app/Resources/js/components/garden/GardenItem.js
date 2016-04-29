var React = require('react'),
    ReactDOM = require('react-dom');

var GardenActions = require('../../actions/GardenActions');
var AnimationMixin = require('../../mixins/AnimationMixin');
var RootPathMixin = require('../../mixins/RootPathMixin');

var Classie = require('classie');
var interact = require('interact');
var update = require('react-addons-update');

var GardenItemContent = React.createClass({

    mixins :[ RootPathMixin ],

    render: function() {
        return (
            <span>
                <img src={this.rootPath + 'images/pictos/' + this.props.item.picto} />
                <h3 className={ this.props.isActive == false ? 'ion-locked' : '' }></h3>
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
                this.checkDraggable();
            }
        }
    },

    componentWillMount :function(){
        this.setState({
            isActive : this.state.points >= this.state.item.price
        });
    },

    componentDidMount :function(){

        this.addAnimationStyle(ReactDOM.findDOMNode(this), ['animated','flipInX'], this.props.index * 100, 1000);
        this.setDraggable();
    },

    setDraggable : function(){

        var that = this;
        this.interact = interact(ReactDOM.findDOMNode(this)).draggable({
            // enable inertial throwing
            //inertia: true,
            //restrict: {
            //    restriction: "parent",
            //    endOnly: true,
            //    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            //},
            // enable autoScroll
            //autoScroll: true,
            enabled:false,

            onstart:function(event){
                that.setState({isDragged:true});
                GardenActions.selectGardenItem(that.props.item);
            },

            // call this function on every dragmove event
            onmove: function(event) {
                var x = (parseFloat(event.target.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(event.target.getAttribute('data-y')) || 0) + event.dy;

                // translate the element
                event.target.style.width =
                    event.target.style.transform =
                        'translate(' + x + 'px, ' + y + 'px)';

                // update the posiion attributes
                event.target.setAttribute('data-x', x);
                event.target.setAttribute('data-y', y);
            },

            onend: function (event) {
                event.target.style.transform ='';
                event.target.removeAttribute('data-x');
                event.target.removeAttribute('data-y');

                that.setState({isDragged:false});
                GardenActions.releaseGardenItem(that.props.item);
                that.checkDraggable();
            }
        }).on('tap',function(event){
            that.handleMouseDown(event);
        }).on('hold',function(event){
            that.handleMouseDown(event);
            GardenActions.selectGardenItem(that.props.item);
        });
        that.checkDraggable();
    },

    checkDraggable:function(){
        if(!this.state.isActive)  this.interact.draggable({ enabled: false });
        else  this.interact.draggable({ enabled: true });
    },

    handleMouseDown:function(sme){
        GardenActions.focusGardenItem(this.props.item);

    },

    handleMouseUp:function(sme){
        //this.setState({isDragged:false});
    },

    render: function() {
        return (
            <div
                tabIndex={this.props.item.odr}
                className={'gardenItem ' + this.props.item.cl + ( (this.state.isActive || this.state.isDragged) ? '' : ' disabled') }
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
            >
                <GardenItemContent
                    isActive={this.state.isActive || this.state.isDragged}
                    item={this.props.item}
                />
            </div>
        );
    }
});

module.exports = GardenItem;