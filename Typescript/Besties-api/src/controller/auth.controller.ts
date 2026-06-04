import {Request, Response} from 'express'

export const signup = (req: Request, res: Response) => {
     try {
          res.send("hello i m signup")
          
     } catch (err) {
          console.log(err)
     }
  
     
}

export const login = (req: Request, res: Response) => {
     try {
          res.send("hello i m login")
          
     } catch (err) {
          console.log(err)
     }
     
}