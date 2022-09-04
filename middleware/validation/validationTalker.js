const BAD_REQUEST = 400; // The server cannot or will not process the request
const UNAUTHORIZED = 401;

const ageValidation = (request, response, next) => {
    const { age } = request.body;
    if (age < 18) {
        return response.status(BAD_REQUEST)
        .json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    if (!age) {
        return response.status(BAD_REQUEST)
        .json({ message: 'O campo "age" é obrigatório' });
    }
    next();
};

const nameValidation = (request, response, next) => {
    const { name } = request.body;
    if (!name) {
        return response.status(BAD_REQUEST)
        .json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return response.status(BAD_REQUEST)
        .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const talkValidation = (request, response, next) => {
    const { talk } = request.body;
    const date = /^([1-9]|\d{2})\/\d{2}\/\d{4}$/; // \d matches a digit 1 of 9 , -00-00-0000
    if (!talk) {
        return response.status(BAD_REQUEST)
        .json({ message: 'O campo "talk" é obrigatório' });
    }
    if (!talk.watchedAt) {
        return response.status(BAD_REQUEST)
        .json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!talk.watchedAt.match(date)) {
        return response.status(BAD_REQUEST)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const talkRateValidation = (request, response, next) => {
    const { talk } = request.body;
    if (!('rate' in request.body.talk)) { // se a rate em obj talk,  
        return response.status(BAD_REQUEST)
        .json({ message: 'O campo "rate" é obrigatório' });
    } // Number.isInteger(1);         // true
    if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
       return response.status(BAD_REQUEST)
       .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};
const tokenValidation = (request, response, next) => {
    const { authorization } = request.headers;
    if (!authorization) {
        return response.status(UNAUTHORIZED)
        .json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
        return response.status(UNAUTHORIZED)
        .json({ message: 'Token inválido' });
    }
    next();
};

module.exports = {
    tokenValidation,
    nameValidation,
    ageValidation,
    talkValidation,
    talkRateValidation,
};
