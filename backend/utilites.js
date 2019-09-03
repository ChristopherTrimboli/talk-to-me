export const hashPassword = (password) => {
    bcrypt.hash(req.body.password, saltRounds, function(bcryptError, hashedPass) {
        if(bcryptError){
            throw error;
        }
        else{
            return hashPassword
        }
    })
}