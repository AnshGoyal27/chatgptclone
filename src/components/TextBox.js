export const TextBox = ({type,message})=>{
    if(type ===  "user"){
        return(
            <div className = "text-start" style={{"width":"100%"}} >
                <h6>USER</h6>
                <p  >
                    {message}
                </p>
            </div>
        )
    }
    else if(type ===  "gpt"){
        return(
            <div className = "text-end" style={{"width":"100%"}} >
                <h6 >GPT</h6>
                <p  >
                    {message}
                </p>
            </div>
        )
    }
    
}