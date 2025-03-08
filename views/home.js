fetch('http://localhost:3000/api/user', {
    method: 'GET'
}).then(async response => {
    const result = await response.json();
    if(response.status === 200) {
        document.getElementById('username').innerText = toTitleCase(result.username);
    } else {
        console.log('An error occurred');
    }
}).catch(error => {
    console.error(error);
    console.log('An error occurred');
});

function toTitleCase(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

function logout() {
    fetch('http://localhost:3000/api/logout', {
        method: 'POST'
    }).then(async response => {
        const result = await response.json();
        if(response.status === 200) {
            window.location.href = '/';
        } else {
            showToast(result.message, 'is-danger');
        }
    }).catch(error => {
        console.error(error);
        showToast("An error occurred", 'is-danger');
    });
}

function showToast(message, type) {
    bulmaToast.toast({
        message: message,
        type: type,
        position: 'bottom-right',
        duration: 3000
    });
}