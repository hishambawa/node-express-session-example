function showToast(message, type) {
    bulmaToast.toast({
        message: message,
        type: type,
        position: 'bottom-right',
        duration: 3000
    });
}

function submitForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {
        username: username,
        password: password
    };

    // add loader to the button
    const button = document.getElementById('submit-btn');
    button.classList.add('is-loading');

    // reset the error messages
    document.getElementById('invalid-password').classList.add('is-hidden');
    document.getElementById('user-not-found').classList.add('is-hidden');

    // send the data to the server
    this.login(data).then(async response => {
        const result = await response.json();

        if(response.status === 200) {
            // redirect to the home page
            window.location.href = '/home';
        } else if(response.status === 401) {
            document.getElementById('invalid-password').classList.remove('is-hidden');
        } else if(response.status === 404) {
            document.getElementById('user-not-found').classList.remove('is-hidden');
            showToast(result.message, 'is-danger');
        } else {
            showToast('An error occurred', 'is-danger');
        }
        
    }).catch(error => {
        console.error(error);
        showToast("An error occurred", 'is-danger');
    }).finally(() => {
        // remove loader from the button
        button.classList.remove('is-loading');
    });
}

function login(data) {
    return fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
