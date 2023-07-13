export const checkIfValid = function(req, res, next){
    const useMode = process.env.MODE

    if(req != useMode) {
        return false
    } else {
        next()
    }
}