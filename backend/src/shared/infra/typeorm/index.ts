import { createConnection } from 'typeorm';

    try {
        createConnection();

        console.log("Conectado com Sucesso!");
    } catch (error) {
        console.log(error);
    }