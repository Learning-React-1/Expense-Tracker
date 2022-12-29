import './Moneymoniter.css'
function Moneymoniter({totalbalance,income,expense}){
    return(
        <div className='money-moniter'>
            <div className='bal'>
                <div className="bal-head">Your Balance</div>
                <div className="bal-value">${totalbalance}</div>
            </div>
            <div className='cost'>
                <div className='inc'>
                    <div className='inc-head'>Income</div>
                    <div className='inc-value'>${income}</div>
                </div>
                <div className='exp'>
                    <div className='exp-head'>Expense</div>
                    <div className='exp-value'>${Number(expense)*-1}</div>
                </div>
            </div>
        </div>
    )
}
export default Moneymoniter;