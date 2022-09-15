import connectDb from "../../middleware/mongoose"
import User from "../models/User"
// var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        console.log(req.body)
        let user = await User.findOne({"email": req.body.email})
        // const bytes = CryptoJS.AES.decrypt(user.password, 'secret123');
        // let decryptedPass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if(user){
        if(req.body.email == user.email && user.password == user.password){
            res.status(200).json({ success: true, email: user.email, name: user.name })
        }
        else{
        res.status(200).json({ success: false, error: "Invalid Credentials"})}
       }
        
       }

        else {
        res.status(400).json({ error: "User Not Found" })
    }

}
export default connectDb(handler);