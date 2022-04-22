
import React,{ Component } from 'react';
class AddressEdit extends Component {
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
        this.update=this.update.bind(this);
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
                    this.setState({cuid: data.decoded.uid});
                    const aid = window.location.pathname.split('/')[2];
                    console.log(aid);
                    this.setState({aid: aid});
                    const link = "http://localhost:3001/addressID/"+this.state.aid;
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
                            this.setState({ aid: response.result[0].aid});
                            this.setState({ afname: response.result[0].afname });
                            this.setState({ alname: response.result[0].alname });
                            this.setState({ atel: response.result[0].atel });
                            this.setState({ city: response.result[0].city });
                            this.setState({ province: response.result[0].province});
                            this.setState({ zipcode: response.result[0].zipcode});
                            this.setState({ adescr: response.result[0].adescr});
                            this.setState({ ccoid: response.result[0].ccoid});
                            this.setState({ cuid: response.result[0].cuid});
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
        const link = "http://localhost:3001/update_address/"+this.state.cuid+"/"+this.state.aid;
        console.log(link);
        fetch(link, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                afname: this.state.afname,
                alname: this.state.alname,
                atel: this.state.atel,
                city: this.state.city,
                province: this.state.province,
                zipcode: this.state.zipcode,
                adescr: this.state.adescr,
                ccoid: this.state.ccoid
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if(response.status==='success'){
                    alert(response.message);
                    window.location='/address';
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
        

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(e){
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Edit Address</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>FIRST NAME:</label><br />
                    <input type="text" name="afname" required value={this.state.afname} onChange={this.handleChange} /><br />
                    <label>LAST NAME:</label><br />
                    <input type="text" name="alname" required  value={this.state.alname} onChange={this.handleChange} /><br />
                    <label>TEL:</label><br />
                    <input type="tel" name="atel"  required pattern="[0-9]{7,15}" value={this.state.atel} onChange={this.handleChange} /><br />
                    <label>CITY:</label><br />
                    <input type="text" name="city" required value={this.state.city} onChange={this.handleChange} /><br />
                    <label>PROVINCE:</label><br />
                    <input type="text" name="province" required value={this.state.province} onChange={this.handleChange} /><br />
                    <label>ZIP CODE:</label><br />
                    <input type="text" name="zipcode" required pattern="[0-9]{5,10}" value={this.state.zipcode} onChange={this.handleChange} /><br />
                    <label>ADDRESS:</label><br />
                    <textarea onChange={this.handleChange}  value={this.state.adescr} name="adescr"/><br />
                    <label>COUNTRY:</label><br />
                    <select onChange={this.handleChange} required defaultValue={this.state.country} name="ccoid">
                        <option value="AF" name="ccoid">Afghanistan</option>
                        <option value="AX" name="ccoid">Åland Islands</option>
                        <option value="AL" name="ccoid">Albania</option>
                        <option value="DZ" name="ccoid">Algeria</option>
                        <option value="AS" name="ccoid">American Samoa</option>
                        <option value="AD" name="ccoid">Andorra</option>
                        <option value="AO" name="ccoid">Angola</option>
                        <option value="AI" name="ccoid">Anguilla</option>
                        <option value="AQ" name="ccoid">Antarctica</option>
                        <option value="AG" name="ccoid">Antigua and Barbuda</option>
                        <option value="AR" name="ccoid">Argentina</option>
                        <option value="AM" name="ccoid">Armenia</option>
                        <option value="AW" name="ccoid">Aruba</option>
                        <option value="AU" name="ccoid">Australia</option>
                        <option value="AT" name="ccoid">Austria</option>
                        <option value="AZ" name="ccoid">Azerbaijan</option>
                        <option value="BS" name="ccoid">Bahamas</option>
                        <option value="BH" name="ccoid">Bahrain</option>
                        <option value="BD" name="ccoid">Bangladesh</option>
                        <option value="BB" name="ccoid">Barbados</option>
                        <option value="BY" name="ccoid">Belarus</option>
                        <option value="BE" name="ccoid">Belgium</option>
                        <option value="BZ" name="ccoid">Belize</option>
                        <option value="BJ" name="ccoid">Benin</option>
                        <option value="BM" name="ccoid">Bermuda</option>
                        <option value="BT" name="ccoid">Bhutan</option>
                        <option value="BO" name="ccoid">Bolivia, Plurinational State of</option>
                        <option value="BQ" name="ccoid">Bonaire, Sint Eustatius and Saba</option>
                        <option value="BA" name="ccoid">Bosnia and Herzegovina</option>
                        <option value="BW" name="ccoid">Botswana</option>
                        <option value="BV" name="ccoid">Bouvet Island</option>
                        <option value="BR" name="ccoid">Brazil</option>
                        <option value="IO" name="ccoid">British Indian Ocean Territory</option>
                        <option value="BN" name="ccoid" >Brunei Darussalam</option>
                        <option value="BG" name="ccoid">Bulgaria</option>
                        <option value="BF" name="ccoid">Burkina Faso</option>
                        <option value="BI" name="ccoid">Burundi</option>
                        <option value="KH" name="ccoid">Cambodia</option>
                        <option value="CM" name="ccoid">Cameroon</option>
                        <option value="CA" name="ccoid">Canada</option>
                        <option value="CV" name="ccoid">Cape Verde</option>
                        <option value="KY" name="ccoid">Cayman Islands</option>
                        <option value="CF" name="ccoid">Central African Republic</option>
                        <option value="TD" name="ccoid">Chad</option>
                        <option value="CL" name="ccoid">Chile</option>
                        <option value="CN" name="ccoid">China</option>
                        <option value="CX" name="ccoid">Christmas Island</option>
                        <option value="CC" name="ccoid">Cocos (Keeling) Islands</option>
                        <option value="CO" name="ccoid">Colombia</option>
                        <option value="KM" name="ccoid">Comoros</option>
                        <option value="CG" name="ccoid">Congo</option>
                        <option value="CD" name="ccoid">Congo, the Democratic Republic of the</option>
                        <option value="CK" name="ccoid">Cook Islands</option>
                        <option value="CR" name="ccoid">Costa Rica</option>
                        <option value="CI" name="ccoid">Côte d'Ivoire</option>
                        <option value="HR" name="ccoid">Croatia</option>
                        <option value="CU" name="ccoid">Cuba</option>
                        <option value="CW" name="ccoid">Curaçao</option>
                        <option value="CY" name="ccoid">Cyprus</option>
                        <option value="CZ" name="ccoid">Czech Republic</option>
                        <option value="DK" name="ccoid">Denmark</option>
                        <option value="DJ" name="ccoid">Djibouti</option>
                        <option value="DM" name="ccoid">Dominica</option>
                        <option value="DO" name="ccoid">Dominican Republic</option>
                        <option value="EC" name="ccoid">Ecuador</option>
                        <option value="EG" name="ccoid">Egypt</option>
                        <option value="SV" name="ccoid">El Salvador</option>
                        <option value="GQ" name="ccoid">Equatorial Guinea</option>
                        <option value="ER" name="ccoid">Eritrea</option>
                        <option value="EE" name="ccoid">Estonia</option>
                        <option value="ET" name="ccoid">Ethiopia</option>
                        <option value="FK" name="ccoid">Falkland Islands (Malvinas)</option>
                        <option value="FO" name="ccoid">Faroe Islands</option>
                        <option value="FJ" name="ccoid">Fiji</option>
                        <option value="FI" name="ccoid">Finland</option>
                        <option value="FR" name="ccoid">France</option>
                        <option value="GF" name="ccoid"> French Guiana</option>
                        <option value="PF" name="ccoid">French Polynesia</option>
                        <option value="TF" name="ccoid">French Southern Territories</option>
                        <option value="GA" name="ccoid">Gabon</option>
                        <option value="GM" name="ccoid">Gambia</option>
                        <option value="GE" name="ccoid">Georgia</option>
                        <option value="DE" name="ccoid">Germany</option>
                        <option value="GH" name="ccoid">Ghana</option>
                        <option value="GI" name="ccoid">Gibraltar</option>
                        <option value="GR" name="ccoid">Greece</option>
                        <option value="GL" name="ccoid">Greenland</option>
                        <option value="GD" name="ccoid">Grenada</option>
                        <option value="GP" name="ccoid">Guadeloupe</option>
                        <option value="GU" name="ccoid">Guam</option>
                        <option value="GT" name="ccoid">Guatemala</option>
                        <option value="GG" name="ccoid">Guernsey</option>
                        <option value="GN" name="ccoid">Guinea</option>
                        <option value="GW" name="ccoid">Guinea-Bissau</option>
                        <option value="GY" name="ccoid">Guyana</option>
                        <option value="HT" name="ccoid">Haiti</option>
                        <option value="HM" name="ccoid">Heard Island and McDonald Islands</option>
                        <option value="VA" name="ccoid">Holy See (Vatican City State)</option>
                        <option value="HN" name="ccoid">Honduras</option>
                        <option value="HK" name="ccoid">Hong Kong</option>
                        <option value="HU" name="ccoid">Hungary</option>
                        <option value="IS" name="ccoid">Iceland</option>
                        <option value="IN" name="ccoid">India</option>
                        <option value="ID" name="ccoid">Indonesia</option>
                        <option value="IR" name="ccoid">Iran, Islamic Republic of</option>
                        <option value="IQ" name="ccoid">Iraq</option>
                        <option value="IE" name="ccoid">Ireland</option>
                        <option value="IM" name="ccoid">Isle of Man</option>
                        <option value="IL" name="ccoid">Israel</option>
                        <option value="IT" name="ccoid">Italy</option>
                        <option value="JM" name="ccoid">Jamaica</option>
                        <option value="JP" name="ccoid">Japan</option>
                        <option value="JE" name="ccoid">Jersey</option>
                        <option value="JO" name="ccoid">Jordan</option>
                        <option value="KZ" name="ccoid">Kazakhstan</option>
                        <option value="KE" name="ccoid">Kenya</option>
                        <option value="KI" name="ccoid">Kiribati</option>
                        <option value="KP" name="ccoid">Korea, Democratic People's Republic of</option>
                        <option value="KR" name="ccoid">Korea, Republic of</option>
                        <option value="KW" name="ccoid">Kuwait</option>
                        <option value="KG" name="ccoid">Kyrgyzstan</option>
                        <option value="LA" name="ccoid">Lao People's Democratic Republic</option>
                        <option value="LV" name="ccoid">Latvia</option>
                        <option value="LB" name="ccoid">Lebanon</option>
                        <option value="LS" name="ccoid">Lesotho</option>
                        <option value="LR" name="ccoid">Liberia</option>
                        <option value="LY" name="ccoid">Libya</option>
                        <option value="LI" name="ccoid">Liechtenstein</option>
                        <option value="LT" name="ccoid">Lithuania</option>
                        <option value="LU" name="ccoid">Luxembourg</option>
                        <option value="MO" name="ccoid">Macao</option>
                        <option value="MK" name="ccoid">Macedonia, the former Yugoslav Republic of</option>
                        <option value="MG" name="ccoid">Madagascar</option>
                        <option value="MW" name="ccoid">Malawi</option>
                        <option value="MY" name="ccoid">Malaysia</option>
                        <option value="MV" name="ccoid">Maldives</option>
                        <option value="ML" name="ccoid">Mali</option>
                        <option value="MT" name="ccoid">Malta</option>
                        <option value="MH" name="ccoid">Marshall Islands</option>
                        <option value="MQ" name="ccoid">Martinique</option>
                        <option value="MR" name="ccoid">Mauritania</option>
                        <option value="MU" name="ccoid">Mauritius</option>
                        <option value="YT" name="ccoid">Mayotte</option>
                        <option value="MX" name="ccoid">Mexico</option>
                        <option value="FM" name="ccoid">Micronesia, Federated States of</option>
                        <option value="MD" name="ccoid">Moldova, Republic of</option>
                        <option value="MC" name="ccoid">Monaco</option>
                        <option value="MN" name="ccoid">Mongolia</option>
                        <option value="ME" name="ccoid">Montenegro</option>
                        <option value="MS" name="ccoid">Montserrat</option>
                        <option value="MA" name="ccoid">Morocco</option>
                        <option value="MZ" name="ccoid">Mozambique</option>
                        <option value="MM" name="ccoid">Myanmar</option>
                        <option value="NA" name="ccoid">Namibia</option>
                        <option value="NR" name="ccoid">Nauru</option>
                        <option value="NP" name="ccoid">Nepal</option>
                        <option value="NL" name="ccoid">Netherlands</option>
                        <option value="NC" name="ccoid">New Caledonia</option>
                        <option value="NZ" name="ccoid">New Zealand</option>
                        <option value="NI" name="ccoid">Nicaragua</option>
                        <option value="NE" name="ccoid">Niger</option>
                        <option value="NG" name="ccoid">Nigeria</option>
                        <option value="NU" name="ccoid">Niue</option>
                        <option value="NF" name="ccoid">Norfolk Island</option>
                        <option value="MP" name="ccoid">Northern Mariana Islands</option>
                        <option value="NO" name="ccoid">Norway</option>
                        <option value="OM" name="ccoid">Oman</option>
                        <option value="PK" name="ccoid">Pakistan</option>
                        <option value="PW" name="ccoid">Palau</option>
                        <option value="PS" name="ccoid">Palestinian Territory, Occupied</option>
                        <option value="PA" name="ccoid">Panama</option>
                        <option value="PG" name="ccoid">Papua New Guinea</option>
                        <option value="PY" name="ccoid">Paraguay</option>
                        <option value="PE" name="ccoid">Peru</option>
                        <option value="PH" name="ccoid">Philippines</option>
                        <option value="PN" name="ccoid">Pitcairn</option>
                        <option value="PL" name="ccoid">Poland</option>
                        <option value="PT" name="ccoid">Portugal</option>
                        <option value="PR" name="ccoid">Puerto Rico</option>
                        <option value="QA" name="ccoid">Qatar</option>
                        <option value="RE" name="ccoid">Réunion</option>
                        <option value="RO" name="ccoid">Romania</option>
                        <option value="RU" name="ccoid">Russian Federation</option>
                        <option value="RW" name="ccoid">Rwanda</option>
                        <option value="BL" name="ccoid">Saint Barthélemy</option>
                        <option value="SH" name="ccoid">Saint Helena, Ascension and Tristan da Cunha</option>
                        <option value="KN" name="ccoid">Saint Kitts and Nevis</option>
                        <option value="LC" name="ccoid">Saint Lucia</option>
                        <option value="MF" name="ccoid">Saint Martin (French part)</option>
                        <option value="PM" name="ccoid">Saint Pierre and Miquelon</option>
                        <option value="VC" name="ccoid">Saint Vincent and the Grenadines</option>
                        <option value="WS" name="ccoid">Samoa</option>
                        <option value="SM" name="ccoid">San Marino</option>
                        <option value="ST" name="ccoid">Sao Tome and Principe</option>
                        <option value="SA" name="ccoid">Saudi Arabia</option>
                        <option value="SN" name="ccoid">Senegal</option>
                        <option value="RS" name="ccoid">Serbia</option>
                        <option value="SC" name="ccoid">Seychelles</option>
                        <option value="SL" name="ccoid">Sierra Leone</option>
                        <option value="SG" name="ccoid">Singapore</option>
                        <option value="SX" name="ccoid">Sint Maarten (Dutch part)</option>
                        <option value="SK" name="ccoid">Slovakia</option>
                        <option value="SI" name="ccoid">Slovenia</option>
                        <option value="SB" name="ccoid">Solomon Islands</option>
                        <option value="SO" name="ccoid">Somalia</option>
                        <option value="ZA" name="ccoid">South Africa</option>
                        <option value="GS" name="ccoid">South Georgia and the South Sandwich Islands</option>
                        <option value="SS" name="ccoid">South Sudan</option>
                        <option value="ES" name="ccoid">Spain</option>
                        <option value="LK" name="ccoid">Sri Lanka</option>
                        <option value="SD" name="ccoid">Sudan</option>
                        <option value="SR" name="ccoid">Suriname</option>
                        <option value="SJ" name="ccoid">Svalbard and Jan Mayen</option>
                        <option value="SZ" name="ccoid">Swaziland</option>
                        <option value="SE" name="ccoid">Sweden</option>
                        <option value="CH" name="ccoid">Switzerland</option>
                        <option value="SY" name="ccoid">Syrian Arab Republic</option>
                        <option value="TW" name="ccoid">Taiwan, Province of China</option>
                        <option value="TJ" name="ccoid">Tajikistan</option>
                        <option value="TZ" name="ccoid">Tanzania, United Republic of</option>
                        <option value="TH" name="ccoid">Thailand</option>
                        <option value="TL" name="ccoid">Timor-Leste</option>
                        <option value="TG" name="ccoid">Togo</option>
                        <option value="TK" name="ccoid">Tokelau</option>
                        <option value="TO" name="ccoid">Tonga</option>
                        <option value="TT" name="ccoid">Trinidad and Tobago</option>
                        <option value="TN" name="ccoid">Tunisia</option>
                        <option value="TR" name="ccoid">Turkey</option>
                        <option value="TM" name="ccoid">Turkmenistan</option>
                        <option value="TC" name="ccoid">Turks and Caicos Islands</option>
                        <option value="TV" name="ccoid">Tuvalu</option>
                        <option value="UG" name="ccoid">Uganda</option>
                        <option value="UA" name="ccoid">Ukraine</option>
                        <option value="AE" name="ccoid">United Arab Emirates</option>
                        <option value="GB" name="ccoid">United Kingdom</option>
                        <option value="US" name="ccoid">United States</option>
                        <option value="UM" name="ccoid">United States Minor Outlying Islands</option>
                        <option value="UY" name="ccoid">Uruguay</option>
                        <option value="UZ" name="ccoid">Uzbekistan</option>
                        <option value="VU" name="ccoid">Vanuatu</option>
                        <option value="VE" name="ccoid">Venezuela, Bolivarian Republic of</option>
                        <option value="VN" name="ccoid">Viet Nam</option>
                        <option value="VG" name="ccoid">Virgin Islands, British</option>
                        <option value="VI" name="ccoid">Virgin Islands, U.S.</option>
                        <option value="WF" name="ccoid">Wallis and Futuna</option>
                        <option value="EH" name="ccoid">Western Sahara</option>
                        <option value="YE" name="ccoid">Yemen</option>
                        <option value="ZM" name="ccoid">Zambia</option>
                        <option value="ZW" name="ccoid">Zimbabwe</option>
                    </select><br />
                    <input type="submit" value="Save" onClick={(e) => this.update(e)}/>
                </form>
            </div>
        );
    }
}


export default AddressEdit;