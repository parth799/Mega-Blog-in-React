/* eslint-disable no-useless-catch */
import conf from "../conf.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
    client = new Client();
    database;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Database methods

    async createDocument({title, slug, content, featuredImage, status, userId}) {
        try {
            const document = await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
                
            );
            return document;
        } catch (error) {
            console.log("Appwrite serive :: CreateDocument :: error", error);

        }
    }

    async getDocument(collectionId, documentId) {
        try {
            const document = await this.database.getDocument(
                conf.appwriteDatabaseId,
                collectionId,
                documentId
            );
            return document;
        } catch (error) {
            console.log("Appwrite serive :: GetDocument :: error", error);

        }
    }

    async updateDocument(slug,{title, content, featuredImage, status}) {
        try {
            const document = await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
            return document;
        } catch (error) {
            console.log("Appwrite serive :: updateDocument :: error", error);
        }
    }

    async deleteDocument(slug) {
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteDocument :: error", error);
                return false
        }
    }

    async getDocuments(slug) {
        try {
            const documents = await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return documents;
        } catch (error) {
            console.log("Appwrite serive :: GetPost :: error", error);

        }
    }

    async listDocuments( queries = [Query.equal("status","active")]) {
        try {
            const documents = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            );
            return documents;
        } catch (error) {
            console.log("Appwrite serive :: listDocument :: error", error);
            return false

        }
    }

    // Storage methods

    async uploadFile(file) {
        try {
            const uploadedFile = await this.bucket.createFile(conf.appwriteBuketId, 
                ID.unique(), 
                file
            );
            return uploadedFile;
        } catch (error) {
            console.log("Appwrite serive :: uploardFile :: error", error);
            return false
        }
    }

    async getFile(fileId) {
        try {
            const file = await this.bucket.getFile(conf.appwriteBuketId, fileId);
            return file;
        } catch (error) {
            console.log("Appwrite serive :: GetFile :: error", error);

        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBuketId, fileId);
            return true
        } catch (error) {
            console.log("Appwrite serive :: DeleteFile :: error", error);
            return false
        }
    }

    // async listFiles(bucketId, queries = []) {
    //     try {
    //         const files = await this.bucket.listFiles(bucketId, queries);
    //         return files;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}

const service = new Service();

export default service;
