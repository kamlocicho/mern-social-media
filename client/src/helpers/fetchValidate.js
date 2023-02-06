export async function fetchValidate(token) {
    return await fetch('http://localhost:3001/auth/validate', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        method: 'POST'
    })
}