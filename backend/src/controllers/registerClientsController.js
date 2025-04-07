import  jsonwebtoken  from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
 
import clientsModel from "../routes/clients.js";
import { config } from "../config.js";
 
const registerClientsController = {};
 
registerClientsController.register = async (req, res) => {
  const {
    name,
    lastName,
    birthday,
    email,
    password,
    telephone,
    dui,
    isVerified,
  } = req.body;
 
  try {
    const existingClient = await clientsModel.findOne({ email });
    if (existingClient) {
      return res.json({ message: "Client already exists" });
    }
    const passwordHash = bcryptjs.hash(password, 10);
    const newClient = new clientsModel({
      name,
      lastName,
      birthday,
      email,
      password: passwordHash,
      telephone,
      dui: dui || null,
      isVerified: isVerified || false,
    });
 
    await newClient.save();
 
    const verificationcode = crypto.randomBytes(3).toString("hex");
 
    const tokenCode = jsonwebtoken.sign(
    
      { email, verificationcode },
  
      config.JWT.secret,
     
      { expiresIn: "2h" }
    );
 
    res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });
 
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.email_user,
        pass: config.email.email_pass,
      },
    });
 

    const mailoptions = {
      from: config.email.email_user,
      to: email,
      subject: "Verificación de correo",
      text:
        "Para verificar tu cuenta utiliza el siguiete codigo: " +
        verificationcode +
        "\n expira en dos horas",
    };
 
 
    transporter.sendMail(mailoptions, (error, info) => {
      if (error) {
        return res.json({ message: "Error sending mail" + error });
      }
      console.log("Email sent" + info);
    });
 
    res.json({
      message: "Client registered, Please verify you email with the code sent",
    });
  } catch (error) {
    console.log("error" + error);
  }
};
 
registerClientsController.verifyCodeEmail = async (req, res) => {
  const { requireCode } = req.body;
 
  const token = req.cookies.verificationToken;
 
  try {
    
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { email, verificationCode: storedCode } = decoded;
 
   
    if (requireCode !== storedCode) {
      return res.json({ message: "Invalid code" });
    }
 
  
    const client = await clientsModel.findOne({email});
    client.isVerified = true;
    await client.save();                                
 
 
    res.clearCookie("verificationToken");
 
    res.json({message: "Email verified Successfully"});
 
 
 
  } catch (error) {
    console.log("error"+error);
  }
};
 
export default registerClientsController;
 