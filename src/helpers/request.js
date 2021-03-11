export default function request(url, method="GET", body){   
    const parameters = {
        method: method,
        headers: {
            "Content-Type": 'application/json'
        },
    }
    if(body){
        parameters.body = JSON.stringify(body)
    }   
    
    return fetch(url, parameters)
    .then(async(response) => {
        const res = await response.json();
        if(response.status >= 400 && response.status <= 599){
            if(res.error){
                throw res.error;
            }
            else {
                throw new Error('Something went wrong!!!');
            }
        }
        return res
    })
    .catch((error)=>{
        console.log('catch error', error);
    });
}
