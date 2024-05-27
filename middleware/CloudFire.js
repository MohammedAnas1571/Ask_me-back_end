export async function cloudflare(req, res, next) {
  
    const {token} = req.body
   
    const ip = req.ip
 
    let formData = new FormData();
    formData.append("secret", process.env.CLOUDFIRE);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const result = await fetch(url, {
      body: formData,
      method: "POST",
    });

    const outcome = await result.json();
    if (outcome.success) {
     next()
    }else{
        res.status(429).send({error:"Too many requests"})
    }
  
}
