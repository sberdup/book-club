export async function fetchGetter(fetchLocation) {
    const request = {}
    request.resp = await fetch(fetchLocation)
    request.data = await request.resp.json()
    return request
} 