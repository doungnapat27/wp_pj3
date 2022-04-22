import React from 'react'
class Admin extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            uid:"",
            fname:"",
            lname:"",
            tel:"",
            gender:"",
            d:"",
            m:"",
            y:""

        };
        this.delete=this.delete.bind(this);
        this.search=this.search.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
    }
    componentDidMount() {
        this.auth()
    }

    auth() {
        const token = localStorage.getItem('token')
        console.log(token)
        fetch("http://localhost:3001/authA", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": 'Bearer ' + token
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.admin[0].l_role);
                if (data.status !== 'ok') {
                    alert('Please login');
                    localStorage.removeItem('token');
                    window.location = '/login';
                }
                if(data.admin[0].l_role!=='A'){
                    alert('You cannot enter here!');
                    localStorage.removeItem('token');
                    window.location = '/login';
                }
                else{
                    this.showAll();
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }

    showAll(){
        fetch("http://localhost:3001/account", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                this.setState({ result: response.result});
            })
            .catch((err) => {
                console.log(err);
            });
    }

    search(e){
                    fetch("http://localhost:3001/searchU",{
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            "accept": "application/json"
                        },
                        body: JSON.stringify({
                            gender: this.state.gender,
                            uid: this.state.uid,
                            fname: this.state.fname,
                            lname: this.state.lname
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


    delete(e,d){
        e.preventDefault();
        const link = "http://localhost:3001/delete_account/"+d;
        console.log(link);
        fetch(link, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if(response.status==='success'){
                    alert(response.message);
                    window.location='/admin'
                }
                else{
                    alert("cannot delete");
                }
            })

            .catch((err) => {
                console.log(err);
                alert("error");
            });
    }
    render() {
        return (
            <div>
                <h1>Management Board</h1>
                <form onSubmit={this.handleSubmit}>
                    <select name="gender" onChange={this.handleChange} value={this.state.gender} defaultValue="all">
                        <option placeholder="">Gender</option>
                        <option name="gender" selected value="all"> All </option>
                        <option name="gender" value="M"> Male </option>
                        <option name="gender" value="F"> Female </option>
                        <option name="gender" value="other"> Others </option>
                        <option name="gender" value="PNS"> Prefer not to say </option>
                    </select>
                    <input type="text" name="uid" placeholder="id" onChange={this.handleChange} value={this.state.uid} defaultValue=""/>
                    <input type="text" name="fname" placeholder="Firstname" onChange={this.handleChange} value={this.state.fname} defaultValue=""/>
                    <input type="text" name="lname" placeholder="Lastname" onChange={this.handleChange} value={this.state.lname} defaultValue=""/>
                    <button type="submit" onClick={(e) => this.search(e)}>Search</button>
                </form>
                <a href='/accountAdd'>
                    <button value="add">Add</button>
                </a>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>First name</th>
                        <th>last name</th>
                        <th>Tel</th>
                        <th>Gender</th>
                        <th>Birthday</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                    {this.state.result && this.state.result.map((result,key) => {
                        var link3 = "/accountEditAdmin/" + result.uid;
                        var link4 = "/account/" + result.uid;
                        var d = result.uid;
                        return (
                            <tr> {" "}
                                <td>{result.uid}</td>
                                <td>{result.fname}</td>
                                <td>{result.lname}</td>
                                <td>{result.tel}</td>
                                <td>{result.gender}</td>
                                <td>{result.d}/{result.m}/{result.y}</td>
                                <a href={link3}>
                                    <button value="Edit">Edit</button>
                                </a>
                                <button value="Delete" onClick={(e) => this.delete(e,d)}>Delete</button>
                                <a href={link4}>
                                    <button value="View">View</button>
                                </a>
                            </tr>
                        );
                    })}
                </table>
            </div>
        );
    }
}
export default Admin;