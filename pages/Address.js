
import React from 'react';
class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aid:"",
            afname:"",
            alname:"",
            atel:"",
            city: "",
            province: "",
            zipcode:"",
            adescr:"",
            ccoid:"",
            cuid:"",
            };
        this.delete=this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        fetch("http://localhost:3001/auth", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": 'Bearer ' + token
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.status !== 'ok') {
                    alert('Please login');
                    localStorage.removeItem('token');
                    window.location = '/login';
                }
                else {
                    this.setState({cuid: data.decoded.uid});
                    const link = "http://localhost:3001/address/"+this.state.cuid;
                    console.log(link)
                    fetch(link, {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            "accept": "application/json"
                        },
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            console.log(response);
                            this.setState({ result: response.result });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }
    delete(e,aid){
        e.preventDefault();
        const link2 = "http://localhost:3001/delete_address/"+aid
        console.log(link2);
        fetch(link2, {
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
                    window.location='/address';
                }
                else{
                    alert("cannot delete");
                }
            })

            .catch((err) => {
                console.log(err);
                alert(err);
            });
    }
        

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <h1>Address</h1>
                {this.state.result && this.state.result.map((result,key) => {
                    let link3="/addressEdit/"+result.aid;
                    let d=result.aid;
                     return (
                        <section>
                            <h5>#{key}</h5>
                            <p>{result.afname}</p>
                            <p>{result.alname}</p>
                            <p>{result.atel}</p>
                            <p>{result.city}</p>
                            <p>{result.province}</p>
                            <p>{result.zipcode}</p>
                            <p>{result.adescr}</p>
                            <p>{result.ccoid}</p>
                            <p>{result.cuid}</p>
                            <a href={link3}>
                                <button value="Edit">Edit</button>
                            </a>
                            <button value="Delete" onClick={(e)=>this.delete(e,d)}>Delete</button>
                        </section>
                    );
                })}
                <a href="/addressAdd">
                    <button value="Add">Add</button>
                </a>
            </div>
        );
    }
}


export default Address;