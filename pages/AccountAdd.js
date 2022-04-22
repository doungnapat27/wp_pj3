import React from 'react'


class AccountAdd extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            uid:"",
            fname:"",
            lname:"",
            tel:"",
            gender:"",
            DOB:"",
            email:"",
            pwd:"",
            l_role:"",
        };
        this.insert=this.insert.bind(this);
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
                console.log(data)
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

            })
            .catch((err) => {
                console.log(err);
            });

    }

    insert(e){
        fetch("http://localhost:3001/insert_account", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                fname: this.state.fname,
                lname: this.state.lname,
                tel: this.state.tel,
                gender: this.state.gender,
                DOB: this.state.DOB,
                email: this.state.email,
                pwd: this.state.pwd,
                l_role: this.state.l_role,
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
                    alert("Cannot Add");
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
                <h1>Add Account</h1>
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
                        <label>EMAIL:</label><br />
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} /><br />
                        <label>PASSWORD:</label><br />
                        <input type="password" name="pwd" value={this.state.pwd} onChange={this.handleChange} /><br />
                        <label>ROLE:</label><br />
                        <div value={this.state.l_role} onChange={this.handleChange} name="l_role">
                            <input type="radio" name="l_role"value="U" onChange={this.handleChange} />User<br />
                            <input type="radio" name="l_role" value="A" onChange={this.handleChange} />Admin<br />
                        </div>
                        <input type="submit" value="Add" onClick={(e) => this.insert(e)} />
                    </form>
            </div>
            </div>
        );
    }
}
export default AccountAdd;