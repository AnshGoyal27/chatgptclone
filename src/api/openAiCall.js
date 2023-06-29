
export async function GPTcall(message,dispatch,load,setLoad){
    setLoad(!load);
    await fetch("https://api.openai.com/v1/chat/completions",{
        method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.REACT_APP_APIKEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                role : "user",
                content : message
            }
        ]
      })
    })
    .then((data)=>{
        return data.json();
    })
    .then((data)=>{
        console.log(data.choices[0].message.content);
        dispatch({
            payload : {
                type : "gpt",
                message :  data.choices[0].message.content
              }
        });
        setLoad(false);
        return data.choices[0].message.content;
    })
    .catch((err)=>{
        console.log(err);
        dispatch({
            payload : {
                type : "gpt",
                message :  "Error Loading"
              }
        });
        setLoad(false)
        return new Error('Error fetching response')
    })

}