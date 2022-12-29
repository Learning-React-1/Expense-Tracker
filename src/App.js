import './App.css';
import Header from './components/Header'
import Moneymoniter from './components/Moneymoniter'
import History from './components/History';
import TransactionInput from './components/TransactionInput';
import {useEffect, useState} from 'react'
function App() {
  const [totalbalance,setTotalBalance]=useState(Number(0).toFixed(2));
  const [income,setIncome]=useState(Number(0).toFixed(2));
  const [expense,setExpense]=useState(Number(0).toFixed(2));
  const [moneyhistory,setMoneyHistory]=useState([])
  /*********************************************************************run at start*********************************************** */
 
  
  useEffect(()=>{
    const fetchdatafromserver=async()=>{
      const res=await fetch("/moneyhistory")
      const ret=await res.json();
      setMoneyHistory(ret);
    }
    try{
   fetchdatafromserver();
    }
    catch(err){
      alert('could not connect to server');
    }
  },[])
  useEffect(()=>{
    const calculatecurrenttotalbalance=()=>{
      const ret=moneyhistory.reduce((total,curr)=>{
        return total+curr.netcost;
      },0)
      return ret;
    }
    const calculatecurrentincome=()=>{
      const ret=moneyhistory.reduce((total,curr)=>{
        if(curr.netcost>0){
          return total+curr.netcost;
        }
        else{
          return total;
        }
      },0)
      return ret;
    }  
    const calculatecurrentexpense=()=>{
      const ret=moneyhistory.reduce((total,curr)=>{
        if(curr.netcost<0){
          return total+curr.netcost;
        }
        else{
          return total;
        }
      },0)
      return ret;
    }
  const currtotal=Number(calculatecurrenttotalbalance()).toFixed(2);
  const currincome=Number(calculatecurrentincome()).toFixed(2);
  const currexpense=Number(calculatecurrentexpense()).toFixed(2);
  setTotalBalance((prevtotal)=>{return currtotal});
  setIncome((previncome)=>{return currincome});
  setExpense((prevexpense)=>{return currexpense});
  },[moneyhistory]);
  /********************************************************************run at start*********************************************** */
  /*********************************************************************transaction-handling-moneyhistory*************************************** */
  const addtransaction=async(currnetcost_name,currnetcost)=>{
    try{

    
    currnetcost=Number(currnetcost)
    const res=await fetch('/moneyhistory',{
      'method':'POST',
        'headers':{
          'Content-type':'application/json'
        },
        'body':JSON.stringify({netcost_name:currnetcost_name,netcost:currnetcost})
    });
    const currindhist=await res.json();
  
    setMoneyHistory((prevmoneyhistory)=>{
    const updatedmoneyhistory=prevmoneyhistory.map((indhistory)=>{return {...indhistory}})
    updatedmoneyhistory.push(currindhist);
    return updatedmoneyhistory;
   })
    }
    catch(err){
      alert('could not connect to server');
    }
  }
  const deletetask=async(taskid)=>{
    try{
    await fetch( `moneyhistory/${taskid}`,{
      'method':'DELETE',
      'headers':{
        'Content-type':'application/json'
      }
    });
    
    
   setMoneyHistory((prevmoneyhistory)=>{
      let updatedmoneyhistory=prevmoneyhistory.map((indhistory)=>{return indhistory})
      
      return updatedmoneyhistory.filter((indhistory)=>{
        return indhistory.id!==taskid;
      }) 
    })
  }catch(err){
    alert('could not connect to server');
  }
    
  }
  /*********************************************************************transaction-handling-moneyhistory*************************************** */
  return (
    <div className="App">
      <Header></Header>
      <Moneymoniter totalbalance={totalbalance} income={income} expense={expense}></Moneymoniter>
      <History moneyhistory={moneyhistory} deletetask={deletetask}></History> 
      <TransactionInput addtransaction={addtransaction}></TransactionInput>
    </div>
  );
}

export default App;
