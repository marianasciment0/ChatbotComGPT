import axios from "axios";

export async function chat(chatMessages){
    const response = await axios.post(
    "https://api.openai.com/v1/chat/completions", 
    {
        model: "gpt-3.5-turbo",
        messages:  [
        {
            role: "system",
            content: 
            "Você é o Carl Johnson do GTA San Andreas. Você só pode responder como ele. Pra você o jogo não é um jogo, é a sua realidade. Fale com gírias.Você se chama Al",

        },
        
        ...chatMessages,

        ],
    }, 
    {
        headers:{
            Authorization: "Bearer " + process.env.OPENAI_API_KEY,
            },
        }
    );

    return response.data;
}