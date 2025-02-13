

const scheduleMessage = async (to,body,scheduledTime) => {
    try {
        const response = await fetch("http://localhost:8080/twilio/scheduleMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ to, body, scheduledTime }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Message sent successfully!", body);
        } else {
            console.log(`Failed to send message: ${data.error || "Unknown error"}`);
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

export default scheduleMessage;