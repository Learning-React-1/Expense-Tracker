import IndividualHistory from "./IndividualHisotry";
import './History.css'
function History({moneyhistory,deletetask}){
return(
    <div className="history">
        <div className="hist-head">History</div>
        <hr></hr>
        {
            moneyhistory.map((individualhistory,index)=>{return <IndividualHistory key={index} netcost_id={individualhistory.id} netcost_name={individualhistory.netcost_name} netcost={individualhistory.netcost} deletetask={deletetask}></IndividualHistory>})
        }
    </div>
)
}
export default History;