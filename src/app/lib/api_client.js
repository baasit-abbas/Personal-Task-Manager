
class API{
    static baseURL = '/api'
    static async request (endpoint,options={}){
        const {method='GET',headers,body} = options
        const res = await fetch(`${this.baseURL}${endpoint}`,{
            method:method,
            headers:{
                'Content-Type':'application/json',
                ...headers
            },
            body:body
        })
        if (!res.ok){
            throw new Error('Failed to fetch API')
        }

        return res.json()
    }
    static get(endpoint){
        return this.request(endpoint)
    }
    static post(endpoint,data){
        return this.request(endpoint,{
            method:'POST',body:JSON.stringify(data)
        })
    }
    static put(endpoint,data){
        return this.request(endpoint,{
            method:'PUT',body:JSON.stringify(data)
        })
    }
    static delete(endpoint,data){
        return this.request(endpoint,{
            method:'DELETE',body:JSON.stringify(data)
        })
    }
}

export default API