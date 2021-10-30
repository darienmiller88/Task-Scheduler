import React, { Fragment }  from 'react'
import "./Days.css"

export default function Days(props) {
    const CHECKED_COLOR = "green"
    const UNCHECKED_COLOR = "rgb(211,211,211)"

    const checkDay = (e) => {
        if(e.target.classList.contains("day")){
            if( e.target.style.backgroundColor === CHECKED_COLOR){
                e.target.style.backgroundColor = UNCHECKED_COLOR
            }else{
                e.target.style.backgroundColor = CHECKED_COLOR
            }
        }
    }

    return (
        <Fragment>
            <div className="select-days-title">Select days to repeat reminder</div>
            <div className="days" ref={props.innerRef} onClick={checkDay}>    
                <span className="Su day">Su</span>
                <span className="Mo day">Mo</span>
                <span className="Tu day">Tu</span>
                <span className="We day">We</span>
                <span className="Th day">Th</span>
                <span className="Fr day">Fr</span>
                <span className="Sa day">Sa</span>
            </div>                    
            {
                props.noDaysAdded 
                ? 
                <div className="days-error" style={{color: "red"}}>{"Please add at least one day!"}</div>
                : 
                null
            }
        </Fragment>
    )
}
