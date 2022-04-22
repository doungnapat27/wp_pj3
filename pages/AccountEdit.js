import React from 'react'


class AccountEdit extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            uid:"",
            fname:"",
            lname:"",
            tel:"",
            gender:"",
            DOB:"",

        };
        this.update=this.update.bind(this);
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
                            this.setState({ fname: response.result[0].fname});
                            this.setState({ lname: response.result[0].lname });
                            this.setState({ email: response.result[0].email });
                            this.setState({ tel: response.result[0].tel });
                            this.setState({ gender: response.result[0].gender});
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

    update(e){
        const link = "http://localhost:3001/update_account/"+this.state.uid;
        console.log(link);
        fetch(link, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                fname: this.state.fname,
                lname: this.state.lname,
                tel: this.state.tel,
                gender: this.state.gender,
                DOB: this.state.DOB
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if(response.status==='success'){
                    alert(response.message);
                    window.location='/profile';
                }
                else{
                    alert("cannot update");
                }
            })

            .catch((err) => {
                console.log(err);
                alert(err);
            });
    }

    render(){
        return(
            <div>
                <h1>Edit Account</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>FIRST NAME:</label><br />
                        <input type="text" name="fname" value={this.state.fname} required onChange={this.handleChange} /><br />
                        <label>LAST NAME:</label><br />
                        <input type="text" name="lname" value={this.state.lname} required onChange={this.handleChange} /><br />
                        <label>TEL:</label><br />
                        <input type="tel" name="tel" value={this.state.tel} onChange={this.handleChange} /><br />
                        <label>GENDER:</label><br />
                        <div value={this.state.gender} onChange={this.handleChange} name="gender">
                            <input type="radio" name="gender" value="F" onChange={this.handleChange} />Female <br />
                            <input type="radio" name="gender" value="M" onChange={this.handleChange} />Male <br />
                            <input type="radio" name="gender" value="other" onChange={this.handleChange} />Others <br />
                            <input type="radio" name="gender" value="PNS"onChange={this.handleChange}  />Prefer not to day <br />
                        </div>
                        <label>DOB:</label><br />
                        <input type="date" name="DOB" value={this.state.DOB} onChange={this.handleChange} /><br />
                        <input type="submit" value="Save" onClick={(e) => this.update(e)} />
                    </form>
            </div>
            </div>
        );
    }
}
export default AccountEdit;