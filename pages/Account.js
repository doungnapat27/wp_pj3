
import React from 'react';
class Profile extends React.Component {
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
                    this.setState({uid: data.decoded.uid});
                    this.showAll();
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }
    showAll(){
        let link = "http://localhost:3001/account/" + this.state.uid;
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
                this.setState({ l_role: response.result[0].l_role });
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
                <h1>Account</h1>
                <Profiles result={this.state.result} />
                <a href="/accountEdit" >
                    <button value="Edit">Edit</button>
                </a>
            </div>
        );
    }
}

class Profiles extends React.Component {
    render() {
        return (
            <div>
                {this.props.result && this.props.result.map((result) => {
                    return (
                        <section>
                            <p>{result.fname}</p>
                            <p>{result.lname}</p>
                            <p>{result.email}</p>
                            <p>{result.tel}</p>
                            <p>{result.d}/{result.m}/{result.y}</p>
                            <p>{result.gender}</p>
                            {result.l_role === 'A' &&<>
                            <a href='/admin'>
                                    <button value="admin">Manage user</button>
                            </a>
                            <a href='/productAdmin'>
                                <button value="p_admin">Manage product</button>
                            </a></>}
                        </section>
                        
                    );
                })}
            </div>
        );
    }
}

export default Profile;