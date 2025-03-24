import EmployeeModel from "../models/employee.js";
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../config.js";

const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) =>{
    const {name, lastName, birthday, email, address, password, hireDate, telephone, dui, isVerified, issnumber} = req.body;
        try{

            const existEmployee = await EmployeeModel.findOne({email})
            if(existEmployee) {
                return res.json({message: "Empleado ya existe"})
            }

            const passwordHash = await bcryptjs.hash(password, 10)

            const newEmployee = new EmployeeModel({
                name,
                lastName,
                birthday,
                email,
                address,
                password: passwordHash,
                hireDate,
                telephone,
                dui,
                isVerified,
                issnumber
            })
        
            await newEmployee.save();

            jsonwebtoken.sign(

                {id: newEmployee._id},

                config.JWT.secret,

                {expiresIn: config.JWT.expiresIn},

                (error, token) => {
                    if(error) console.log(error)
                    res.cookie("authToken", token)
                }

            )

        } catch (error) {
            console.log(error);
        }
};


export default registerEmployeesController;