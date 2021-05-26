import axios from 'axios';
import React,{useState} from 'react';

function Balancer(props) {
    const [jj,jj_handler] = useState("")
    const [val,val_handler] = useState("")
    function kk(){
        axios.get('http://127.0.0.1:8000/balancer/'+val)
        .then(response=>{
            jj_handler(response.data)
        })
        .catch(e=>{
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