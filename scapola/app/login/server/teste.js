import bcrypt from 'bcrypt';

const senhaOriginal = '123456'; // Senha que para hash
bcrypt.hash(senhaOriginal, 10, (err, hash) => {
    if (err) {
        console.error('Erro ao gerar hash:', err);
    } else {
        console.log('Hash gerado:', hash);
    }
});
