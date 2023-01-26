/*const getRecSpecialist = (async (req, res) => {
    const { ChatGPTAPI, getOpenAIAuth } = await import('chatgpt')

    const openAIAuth = await getOpenAIAuth({
        email: process.env.openai_email,
        password: process.env.openai_password,
        isGoogleLogin: true,
        minimize: true
    })

    const api = new ChatGPTAPI({ ...openAIAuth })
    await api.initSession()

    const result = await api.sendMessage(`Recommend a specialist for ${req.body.symptom}, only output 1 word specialists, for example, Allergists, make it plural.`)
    console.log(result)
    res.status(200).send(result.response)
})*/

const getRecSpecialist = (async (req, res) => {
    const { ChatGPTAPIBrowser } = await import('chatgpt')

    const email = process.env.OPENAI_EMAIL
    const password = process.env.OPENAI_PASSWORD

    const api = new ChatGPTAPIBrowser({
        email,
        password,
        isGoogleLogin: true,
        debug: false,
        minimize: true
    })
    await api.initSession()

    const prompt = `Recommend a specialist for ${req.body.symptom}, only output 1 word specialists, for example, Allergists, make it plural.`

    const result = await api.sendMessage(prompt)
    const specialist = result.response.replace(/\.$/, "")
    console.log(specialist)
    res.status(200).send(specialist)
    // close the browser at the end
    await api.closeSession()
})

module.exports = {
    getRecSpecialist
}