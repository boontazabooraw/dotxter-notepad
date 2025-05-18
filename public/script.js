const inputField = document.getElementById('field');

// Fetch the file content from server and populate the input
fetch('/file-content')
    .then(response => response.text())
    .then(data => {
        inputField.value = data;
    })
    .catch(err => console.error(err));

// Updating every CTRL + S
window.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault(); // Prevent browser's save dialog

        fetch('/update-file', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: inputField.value })
        })
            .then(() => {
                console.log('File saved successfully!');
            })
            .catch(err => {
                console.error('Save failed:', err);
            });
    }
});