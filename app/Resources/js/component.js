import React from "react";

var Component = React.createClass({
    getInitialState: function() {
        return EntityStore.getState();
    },
    componentDidMount: function() {
        EntityStore.addChangeListener(this._onChange);
        this.getEntityDataIfNeeded(this.props);
    },
    componentWillUnmount: function() {
        EntityStore.removeChangeListener(this._onChange);
    },
    componentWillReceiveProps: function(nextProps) {
        this.getEntityDataIfNeeded(nextProps);
    },
    getEntityDataIfNeeded: function(props) {
        var meta = EntityStore.getState().metaData;
        if(props.activeEntity && props.activeEntity !== meta.id) {

            EntityActions.getEntityData(this.props.activeEntity);

        }
    },
    _onChange: function() {this.setState(EntityStore.getState());},
    render: function() {
        return (
            <h1>{'aa!'}</h1>
        );
    }
});

export default Component;