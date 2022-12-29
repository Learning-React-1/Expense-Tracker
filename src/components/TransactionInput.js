import './TransactionInput.css'
import {useState} from 'react'
function TransactionInput({addtransaction}){
    const [currnetcost_name,setNetCostName]=useState('');
    const [currnetcost,setNetCost]=useState(0);
    const transactionformhandler=(e)=>{
        e.preventDefault();
        addtransaction(currnetcost_name,Number(currnetcost));
        setNetCostName('');
        setNetCost(0);
    }
return(
    <div className='transactioninput' onSubmit={(e)=>{transactionformhandler(e)}}>
        <div>Add New Transaction</div>
        <hr></hr>
        <form className='transaction-form'>
            <div>Transaction Text</div>
            <input type="text" placeholder="Enter text..." value={currnetcost_name} className="transaction-input" onChange={(e)=>{setNetCostName(e.target.value)}}></input>
            <div>Amount</div>
            <div>(negative - expense, positive - income)</div>
            <input type="number" placeholder="Enter Amount..." value={currnetcost} className="transaction-input" onChange={(e)=>{setNetCost(e.target.value)}}></input>
            <br/>
            
            <input type="submit" value="Add Transaction" className="transaction-submit"></input>
        </form>
    </div>
)
}
export default TransactionInput;