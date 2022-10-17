import axios from "axios";


export function POST(url, formBody) {
    return (axios({
        method: 'POST',
        url: url,
        data: formBody,
        config: {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
    }))
}


export function PUT(url, formBody) {
    return (axios({
        method: 'PUT',
        url: url,
        data: formBody,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    }))
}

export function GET(url) {
    return (axios({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    }))
}

export function DELETE(url) {
    return (axios({
        method: 'DELETE',
        url: url,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    }).catch(
        function (error) {
            alert('This error based on blocking ip from api main server');
        }
    ))
}