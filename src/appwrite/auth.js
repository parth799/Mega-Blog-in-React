/* eslint-disable no-useless-catch */
import conf from "../conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
     client = new Client()

     account;

     constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
     }

     async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.client(ID.unique(), email, password, name);
            
            if(userAccount){
               return this.login({email, password})

            }else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
     }

     async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("appwrite serive :: login :: error", error);
        }
     }
     async logout() {
        try {
            return await this.account.deleteSessions('current');
        } catch (error) {
            console.log("appwrite serive :: logout :: error", error);

        }
     }

     async isLoggedIn() {
        try {
            const session = await this.account.get();
            return session ? true : false;
        } catch (error) {
            return false;
        }
     }

}

const authService = new AuthService()


export default authService