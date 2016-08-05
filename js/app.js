const App = React.createClass({
    getInitialState: function () {
        return {
            isEditor: true,
            elements: []
        }
    },
    toggle: function () {
        this.setState({
            isEditor: !this.state.isEditor
        });
    },
    addElement: function (element) {
        const elements = this.state.elements;
        elements.push(element);
        this.setState({elements});
    },
    deleteElement: function (index) {
        const elements = this.state.elements;
        elements.splice(index, 1);
        this.setState({elements});
    },
    render: function () {
        const isEditor = this.state.isEditor;
        return <div>
            <div className="text-center bg-success">
                <br/>
                <button type="button" className="btn-info btn-lg "
                        onClick={this.toggle}>{isEditor ? "Preview" : "Edit"}</button>
                <br/>
                <br/>
            </div>
            <div className={isEditor ? "" : "hidden"}>
                <Editor elements={this.state.elements} onAdd={this.addElement} onDelete={this.deleteElement}/>
            </div>
            <div className={isEditor ? "hidden" : ""}>
                <Previewer elements={this.state.elements}/>
            </div>
        </div>;
    }
});

const Editor = React.createClass({
    render: function () {
        return <div className="row">
            <div className="col-lg-6 col-lg-offset-2">
                <Left elements={this.props.elements} onDelete={this.props.onDelete}/>
            </div>
            <div className="col-lg-offset-8 text-center">
                <Right onAdd={this.props.onAdd}/>
            </div>
        </div>;
    }
});

const Left = React.createClass({
    remove: function (index) {
        this.props.onDelete(index);
    },
    render: function () {
        const elements = this.props.elements.map((ele, index) => {
            return <div>
                <div key={index} className="text-center">
                    <br/>
                    <input type={ele}/>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="glyphicon glyphicon-remove text-danger" onClick={this.remove.bind(this, index)}> </span>
                    <br/>
                </div>
            </div>
        });
        return <div>
            {elements}
            <br/>
        </div>
    }
});

const Right = React.createClass({
    add: function () {
        const element = $("input[name=element]:checked").val();
        this.props.onAdd(element);
    },
    render: function () {
        return <div className="input-lg text-primary">
            <input type="radio" name="element" value="text"/>Text
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="element" value="date"/>Date
            <br/>
            <br/>
            <button onClick={this.add}>Add</button>
        </div>
    }
});

const Previewer = React.createClass({
    render: function () {
        const elements = this.props.elements.map((ele, index) => {
            return <div key={index}>
                <input type={ele}/>
                <br/><br/>
            </div>;
        });
        return <div>
            <div className="row text-center">
                <div className="table-bordered col-lg-offset-3 col-lg-6">
                    <br/>
                    {elements}
                </div>
            </div>
            <br/>
            <div className="text-center row">
                <button className="btn-success btn-lg">Submit</button>
            </div>
        </div>;
    }
});


ReactDOM.render(<App />, document.getElementById('content'));