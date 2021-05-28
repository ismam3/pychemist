import React, { Component } from 'react';
import axios from 'axios';

class Balancer extends Component {
    constructor(props) {
        super(props);
        this.state = {jj: "",
                        val:"",
                        };
      }
      changer = (event)=>{
        if (event.target.value == null || ""){
            this.setState({val:"Please send an equation!!"})
        }
        else{
            this.setState({val:event.target.value})
        }
      }

      kk = ()=>{
        if(this.state.val !=""){
            axios.get('http://127.0.0.1:5000/equation/'+this.state.val)
            .then(response=>{
                this.setState({jj:response.data})
            })
            .catch(e=>{
                console.log(e.response)
                this.setState({jj:"OOpps!!There is a problem..Please refresh your browser and try again!"})
            })
        }
        else{
            this.setState({jj:"Dear Chemist, please send an equation"})
        }
      }

    render() {
        return (
            <div>
                <div className="balancer">
                    <div style={{float:'left',marginLeft:'20px'}}>
                        <h4 style={{textAlign:'left'}}>Balance your chemical equation</h4>
                        <input placeholder="e.g.,  Mg+O2=MgO" style={{fontSize:'28px',width:'93%'}} type="text" onChange={this.changer}></input>
                        <input style={{width:"200px"}} className="balance_button" type="button" value='Balance' onClick={this.kk}></input>
                        {this.state.jj==""||"Please send an equation!!"||"OOpps!!There is a problem..Please refresh your browser and try again!"?
                        <h3>{this.state.jj}</h3>
                        :
                        <h3 style={{fontSize:'30px',}}><span>Here it is:</span> <span style={{fontFamily:'Copperplate, Papyrus, fantasy'}}>{this.state.jj}</span></h3>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Balancer;






/* 

import axios from 'axios';
import React,{useState} from 'react';

function Balancer(props) {
    const [jj,jj_handler] = useState("")
    const [val,val_handler] = useState("")
    function kk(){
        axios.get('https://projectsbackend.herokuapp.com/'+val)
        .then(response=>{
            jj_handler(response.data)
        })
        .catch(e=>{
            console.log(e)
            jj_handler("OOpps!!There is a problem..Please refresh your browser and try again!")
        })
    }
    function changer(event){
        val_handler(event.target.value)
    }
    return (
        <div>
            <div>
                <div className="balancer">
                    <div style={{float:'left',marginLeft:'20px'}}>
                        <h4 style={{textAlign:'left'}}>Balance your chemical equation</h4>
                        <input style={{fontSize:'30px',width:'93%'}} type="text" onChange={changer}></input>
                        <input style={{width:"200px"}} className="balance_button" type="button" value='Balance' onClick={kk}></input>
                        {jj==""?
                        <h3>{jj}</h3>
                        :
                        <h3 style={{fontSize:'30px',}}><span>Here it is:</span> <span style={{fontFamily:'Copperplate, Papyrus, fantasy'}}>{jj}</span></h3>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Balancer;

*/



