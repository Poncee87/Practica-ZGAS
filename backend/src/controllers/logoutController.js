const logoutController = {};

logoutController.logout = async(req, res)=> {

    res.clearCookie("authToken")

    return res.json({message: "Sesion Cerrada"})
};

export default logoutController;