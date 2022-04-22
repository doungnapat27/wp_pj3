
import React from 'react';
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: "",
            cid: "",
            p_name: "",
            price: "",
            color: "",
            p_desc: "",
            pic_name: "",
            ctname: ""
            };
        this.search=this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    search(e){
        e.preventDefault();
                    fetch("http://localhost:3001/search",{
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            "accept": "application/json"
                        },
                        body: JSON.stringify({
                            ctname: this.state.ctname,
                            price: this.state.price,
                            p_name: this.state.p_name
                        }),
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            console.log(response);
                            this.setState({ result: response.results });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
    }
    render() {
        return (
            <div>
                <h1>Search</h1>
                <form onSubmit={this.handleSubmit}>
                    <select name="ctname" onChange={this.handleChange} value={this.state.ctname}>
                        <option placeholder="">Category</option>
                        <option name="ctname" selected value="all"> All </option>
                        <option name="ctname" value="pants"> Pants </option>
                        <option name="ctname" value="t-shirt"> T-shirts </option>
                        <option name="ctname" value="vest"> Vests </option>
                        <option name="ctname" value="jacket"> Jackets </option>
                        <option name="ctname" value="shoes"> Shoes </option>
                        <option name="ctname" value="hat"> Hats </option>
                        <option name="ctname" value="accessories"> Accessories </option>
                    </select>
                    <select name="price" onChange={this.handleChange} value={this.state.price}>
                        <option placeholder="">Price</option>
                        <option value="all" selected> All </option>
                        <option value="500"> {'>'}=500 </option>
                        <option value="1000"> {'>'}=1000 </option>
                        <option value="1500"> {'>'}=1500 </option>
                        <option value="2000"> {'>'}=2000 </option>
                        <option value="3000"> {'>'}=3000 </option>
                        <option value="3500"> {'>'}=3500 </option>
                        <option value="4000"> {'>'}=4000 </option>
                    </select>
                    <input type="text" name="p_name" placeholder="Search" onChange={this.handleChange} value={this.state.p_name} />
                    <button type="submit" onClick={(e) => this.search(e)}>Search</button>
                </form>
                <Products result={this.state.result} /><br />
            </div>
        );
    }
}

class Products extends React.Component {
    render() {
        return (
            <div>
                {this.props.result && this.props.result.map((result) => {
                    var link3 = "/product/" + result.pid;
                    return (
                        <section>
                            <p>{result.pic_name}</p>
                            <p>{result.p_name}</p>
                            <p>{result.price}</p>
                            <a href={link3}>
                                    <button value="click">Click!</button>
                            </a>
                        </section>
                    );
                })}
            </div>
        );
    }
}

export default Search;