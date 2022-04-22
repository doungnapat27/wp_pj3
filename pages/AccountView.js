import React from 'react';
class AccountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: "",
            fname: "",
            lname: "",
            email: "",
            tel: "",
            gender: "",
            d: "",
            m:"",
            y:"",
            l_role:""
            };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                    this.showAddress();
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }
    showAll(){
        const uid = window.location.pathname.split('/')[2];
        console.log(uid);
        this.setState({uid: uid});
        let link = "http://localhost:3001/account/" +uid;
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
                this.setState({ fname: response.result[0].fname });
                this.setState({ lname: response.result[0].lname });
                this.setState({ email: response.result[0].email });
                this.setState({ gender: response.result[0].gender });
                this.setState({ tel: response.result[0].tel });
                this.setState({ d: response.result[0].d });
                this.setState({ m: response.result[0].m });
                this.setState({ y: response.result[0].y });
                this.setState({ l_role: response.result[0].l_role });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    showAddress(){
        const uid = window.location.pathname.split('/')[2];
        console.log(uid);
        const link = "http://localhost:3001/address/"+uid;
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
                this.setState({ addresses: response.result });
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
                <h1>Account #{this.state.uid}</h1>
                <p>Name: {this.state.fname} {this.state.lname}</p>
                <p>e-mail: {this.state.email}</p>
                <p>Tel: {this.state.tel}</p>
                <p>Gender: {this.state.gender}</p>
                <p>Birthday: {this.state.d} {this.state.m} {this.state.y}</p>
                <p>Role: {this.state.l_role}</p>
                {this.state.aaddresses && this.state.addresses.map((result,key) => {
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
            </div>
        );
    }
}
export default AccountView;