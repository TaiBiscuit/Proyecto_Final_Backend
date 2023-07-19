export const checkIfValid = function(req, res, next){
    const useMode = process.env.MODE
    if(useMode == 'USER' && req.path == '/products/add' || useMode =='ADMIN' && req.path == '/carts' || useMode =='ADMIN' && req.path == '/chat' ) {
        res.send({status: 'EM', error: useMode});
    } else {
        next()
    }
}