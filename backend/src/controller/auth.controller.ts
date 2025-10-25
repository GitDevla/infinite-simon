import type { Request, Response } from "express";
import { UserService } from "../service/user.service";
import jwt from "jsonwebtoken";
import { error } from "console";

export async function loginController(req: Request, res: Response) {
	const { username, password } = req.body;
	
    const success = await UserService.login(username, password);
    if (success) {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable is not defined");
        }
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "30d" });

        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, error: "Invalid credentials" });
    }
}

function credentialValidation(username: string, password: string, email:string){
    var specials = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var uppers = /[A-Z]/;
    var lowers = /[a-z]/;
    var numbers = /[0-9]/;
    if(specials.test(username)){
        return [false,"Username may not contain specials"];
    }
    if(password.length<=8||!specials.test(password)||!uppers.test(password)||!lowers.test(password)||!numbers.test(password)){
        return [false,"Password must contain upper and lower case letters, a number, and a special character"];
    }
    if (!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
        return [false,"Email does not match requirements"]
    }
    
    return [true,""];
}

export async function registerController(req: Request, res: Response) {
    const { username, password,email } = req.body;
    const [isCredsValid, errorMessage]=credentialValidation(username,password,email);
    if (!isCredsValid){
        res.status(418).json({success: false, errorMessage})
    }
    else{
        try {
        await UserService.register(username, email, password);
        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message });
    }
    }
}