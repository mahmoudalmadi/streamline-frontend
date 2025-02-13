

const sendMessage = async (to,message) => {
    try {
        const response = await fetch("http://localhost:8080/send-sms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ to, message }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Message sent successfully!", message);
        } else {
            console.log(`Failed to send message: ${data.error || "Unknown error"}`);
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

export default sendMessage;