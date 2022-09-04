const BAD_REQUEST = 400; // The server cannot or will not process

const validateEmail = (request, response, next) => {
    const emailParam = /^\S+@\S+\.\S+$/;
    const { email } = request.body;
    if (!email) {
        return response.status(BAD_REQUEST)
        .json({ message: 'O campo "email" é obrigatório' });
}
    if (!email.match(emailParam)) {
      return response.status(BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

const validatePassword = (request, response, next) => {
    const { password } = request.body;
    if (!password) {
        return response.status(BAD_REQUEST)
        .json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length <= 6) {
        return response.status(BAD_REQUEST)
        .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

function generateToken(length) { 
  let radomString = '';
  const caracters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) {
      radomString += caracters.charAt(Math.floor(Math.random() * caracters.length));
  }
  return radomString;
}

module.exports = {
  generateToken,
  validatePassword,
  validateEmail,
};
