export async function getApi(url:string, options: RequestInit ={}){
    const accessToken = sessionStorage.getItem('accessToken')
    const headers = {
        ...(options.headers ||{}),
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }

    const res = await fetch(`${url}`,{...options, headers:headers})
    return res
} 

export async function deleteApi(url: string, options: RequestInit ={}) {
    const accessToken = sessionStorage.getItem('accessToken')
    const headers = {
        ...(options.headers ||{}),
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }

    const res = await fetch(`${url}`,{
        method: 'DELETE',
        ...options,
        headers: headers
    })
    return res
}
export async function postApi(url:string, options: RequestInit = {}, body: any) {
    const accessToken = sessionStorage.getItem('accessToken')
    const headers = {
        ...(options.headers ||''),
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }

    const res = await fetch(`${url}`,{
        method: 'POST',
        ...options,
        headers: headers,
        body: JSON.stringify(body)
    })
    return res
}

export async function putApi(url:string, options: RequestInit = {}, body: any) {
    const accessToken = sessionStorage.getItem('accessToken')
    const headers = {
        ...(options.headers || ''),
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }

    const res = fetch(`${url}`,{
        method: "PUT",
        ...options,
        headers: headers,
        body: JSON.stringify(body)
    })

    return res
}