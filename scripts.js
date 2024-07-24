document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const responseMessage = document.getElementById('response-message');
    const loader = document.getElementById('loader');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        const file = formData.get('file');
        const name = formData.get('name');
        const price = formData.get('price');
        const description = formData.get('description');
        const contact = formData.get('contact');
        const offer = formData.get('offer');
        const ratings = formData.get('ratings');

        // Convert file to Base64
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Data = reader.result.split(',')[1]; // Remove data URL prefix
            const payload = {
                name: name,
                price: parseFloat(price),
                description: description,
                type: file.type,
                contact: contact,
                offer: parseFloat(offer),
                ratings: parseInt(ratings, 10),
                data: base64Data,
                fileName: file.name
            };

            // Show loader
            loader.classList.remove('hidden');

            try {
                const response = await fetch('https://MovieSearch.cfapps.us10-001.hana.ondemand.com/saveImage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                responseMessage.textContent = 'Upload successful!';
                responseMessage.style.color = 'green';
            } catch (error) {
                console.error('Error uploading statue:', error);
                responseMessage.textContent = 'Upload failed. Please try again.';
                responseMessage.style.color = 'red';
            } finally {
                // Hide loader
                loader.classList.add('hidden');
            }
        };

        reader.readAsDataURL(file); // Trigger file reading
    });
});
