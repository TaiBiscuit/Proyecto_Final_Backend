
export const getChatScreen = async (req, res) => { 
    try {
        res.render('chat')
    } catch (error) {
        res.status(500).send({status: 'EM', error: err});
    }
}