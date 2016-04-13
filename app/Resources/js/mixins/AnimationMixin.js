var React = require('react');
var ReactDOM = require('react-dom');

var AnimationMixin = {

    componentWillMount: function() {
        this.animationTimeOut = null;
    },

    addAnimationStyle:function(node, classes, delay, duration){
        classes.map((cl, index, classes) => {
            node.classList.add(cl);
        }, node);
        node.style.animationDelay = delay / 1000 + 's';
        node.style.animationDuration = duration / 1000 + 's';

        this.animationTimeOut = setTimeout((node,classes) => {
            this.clearAnimationStyle(node, classes)
        }, delay + duration, node, classes);
    },

    clearAnimationStyle:function(node, classes){
        if(this.animationTimeOut) clearTimeout(this.animationTimeOut);
        classes.map((cl, index, classes) => {
            node.classList.remove(cl);
        }, node);
        node.style.animationDelay = '';
        node.style.animationDuration = '';
    },

    componentWillUnmount: function() {
        clearTimeout(this.animationTimeOut);
    }
};

module.exports = AnimationMixin;