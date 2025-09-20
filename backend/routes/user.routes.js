import { Router } from "express";
import { login, Register } from "../auth/auth.controller.js";
import { requireAdmin, requireAuth } from "../middleware/auth.middleware.js";

const UserRouter = Router();

//POST USER
UserRouter.post('/register',Register);

//POST user for the login
UserRouter.post('/login',login);

//GET the user profile
UserRouter.get('/profile/:id',requireAuth,()=>{});// proptected route
                        //    ^^^^^^^^ auth middleware to protect the route
//the above middleware will check if the user is authenticated before allowing access to the profile route
//DELETE the user
UserRouter.delete('/delete/:id',requireAuth,requireAdmin,()=>{});

//UPDATE the user 
UserRouter.put('/update/:id',requireAuth,()=>{});

//GET all users
UserRouter.get('/all-users',requireAuth,requireAdmin,()=>{});//for the debugging purpose



export default UserRouter;