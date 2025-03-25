import customersModel from "../models/customers.js";
import employeesModel from "../models/employee.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        let userFound;
        let userType;


        if(email === config.emailAdmin.email && password === config.emailAdmin.password){
            userType="admin"
            userFound={_id:"admin"}
        }else{
            userFound = await employeesModel.findOne({email})
            userType = "employee"

            if(!userFound){
                userFound = await customersModel.findOne({email})
                userType = "customer"
            }
        }

        if(!userFound){
            console.log("A pesar de buscar en todos lados no esta")
            return res.json({message: "User not found"})
        }

        if(userType !== "admin"){

            const isMatch = await bcryptjs.compare(password, userFound.password)
            if(!isMatch){
                return res.json({message: "Contraseña incorrecta"})
            }

        }

        jsonwebtoken.sign(

            {id: userFound._id, userType},

            config.JWT.secret,

            {expiresIn: config.JWT.expiresIn},

            (error, token)=> {
                if(error) console.log(error)

                    res.cookie("authToken", token)
                    res.json({message: "login succesful"})
            }


        )
    } catch (error) {

        res.json({message: "error"})
    }
}

export default loginController;