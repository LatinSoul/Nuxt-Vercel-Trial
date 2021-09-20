export default async function handler(req, res) {
    const { body } = await req;
    return res.send(`Hello ${body.name}, you just parsed the request body!`);
}