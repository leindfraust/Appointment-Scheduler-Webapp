export const getRecSpecialist = (async (req, res) => {
    const { ChatGPTAPI } = await import('chatgpt')

    const api = new ChatGPTAPI({
        apiKey: process.env.openai_key
    })
    const prompt = `Recommend a specialist for ${req.body.symptom}, only output 1 word specialists, for example, Allergists, make it plural.`

    const result = await api.sendMessage(prompt)
    const specialist = result.text.split('.').join("")
    console.log(specialist)
    res.status(200).send(specialist)
})