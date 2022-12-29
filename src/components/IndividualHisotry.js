import './IndividualHistory.css'
function IndividualHistory({netcost_id,netcost_name,netcost,deletetask}){
return(
    <div className='history-package'>
        <div className="individualhistory1" style={{borderLeftColor:setcolor(netcost)}}>
            <div>{netcost_name}</div>
            <div>{netcost>0 ? `+${netcost}`: `${netcost}`}</div>
        </div>
        <span className='individualhistory2' onClick={()=>{deletetask(netcost_id)}}> x</span>
    </div>
)
}
const setcolor=(netcost)=>{
    return netcost>0 ? "greenyellow" : "red"
}
export default IndividualHistory;