// const API_KEY = "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";

export async function GPTcall(message,dispatch){
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
        return data.choices[0].message.content;
    })
    .catch((err)=>{
        console.log(err);
        return new Error('Error fetching response')
    })

}