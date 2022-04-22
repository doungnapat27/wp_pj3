
import React from 'react';
class Product extends React.Component {
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    show(e){
        const pid = window.location.pathname.split('/')[2];
        console.log(pid);
        this.setState({pid: pid});
        const link = "http://localhost:3001/product/"+pid;
                    fetch(link,{
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            "accept": "application/json"
                        },
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            console.log(response);
                            this.setState({ cid: response[0].cid });
                            this.setState({ p_name: response[0].p_name });
                            this.setState({ color: response[0].color });
                            this.setState({ p_desc: response[0].p_desc });
                            this.setState({ pic_name: response[0].pic_name });
                            this.setState({ ctname: response[0].ctname });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                
    }
    componentDidMount() {
        this.show()
    }
    handleSubmit(e) {
        e.preventDefault();
    }
    render() {
        return (
            <div>
                {/* ตรงนี้เพิ่มตัวแปรได้ตามใจ */}
                <h1>{this.state.p_name}</h1>
                <p>{this.state.pic_name}</p>
                <p>{this.state.p_desc}</p>
                <p>{this.state.color}</p>
                <p>{this.state.price}</p>
            </div>
        );
    }
}

export default Product;