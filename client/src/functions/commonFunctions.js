export async function fetchGetter(fetchLocation) {
    const resp = await fetch(fetchLocation)
    const data = await resp.json()
    if (resp.ok) {
        return data
    }
    return resp
} 