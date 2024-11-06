export async function sendMessage(data) {
    const response = await fetch("http://localhost:5174/message", { // Update the endpoint to match your backend route
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: data }) // Send the user message in the request body
    });

    const resData = await response.json();

    if (!response.ok) {
        const error = new Error("Failed to get data");
        throw error;
    }

    return resData.reply;
}

