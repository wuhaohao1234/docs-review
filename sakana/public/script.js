document.getElementById('upload').addEventListener('change', handleFileSelect, false);
document.getElementById('generate').addEventListener('click', generateTextFile, false);

function handleFileSelect(event) {
    const reader = new FileReader();
    reader.onload = function (event) {
        mammoth.extractRawText({ arrayBuffer: event.target.result })
            .then(displayContent)
            .catch(handleError);
    };
    reader.readAsArrayBuffer(event.target.files[0]);
}

function displayContent(result) {
    const paragraphs = result.value.split('\n');
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    paragraphs.forEach((paragraph, index) => {
        const paraDiv = document.createElement('div');
        paraDiv.classList.add('paragraph');
        paraDiv.innerHTML = `
            <input type="checkbox" id="check${index}" />
            <label for="check${index}">${paragraph}</label>
        `;
        contentDiv.appendChild(paraDiv);
    });
}

function handleError(err) {
    console.error(err);
}

function generateTextFile() {
    let textToWrite = '';
    const checkboxes = document.querySelectorAll('#content input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            textToWrite += document.querySelector(`label[for="${checkbox.id}"]`).textContent + '\n';
        }
    });

    const blob = new Blob([textToWrite], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'selected_text.txt';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
