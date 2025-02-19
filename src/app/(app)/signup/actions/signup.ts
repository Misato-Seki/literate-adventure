"use server"

import { cookies } from 'next/headers';
import { getPayload, User } from "payload"
import config from "@payload-config"

interface SignUpParams {
    email: string,
    password: string,
    role: "editor"
}

export interface SignupResponse {
    success: boolean,
    error?: string
}

type Result = {
    exp?: number
    token?: string
    user?: User
}

export async function signup({email, password, role}: SignUpParams): Promise<SignupResponse> {
    const payload = await getPayload({config}) 
    try {
        await payload.create({
            collection: "users",
            data: {
                email,
                password,
                role
            }
        })
        const result: Result = await payload.login({
            collection: "users",
            data: {
                email,
                password
            }   
        })
        if (result.token) {
            const cookieStore   = await cookies();
            cookieStore.set({
                name: "payload-token",
                value: result.token,
                httpOnly: true,
                path: "/",
            })
            return {
                success: true
            }
        }
        return {
            success: false,
            error: "Something went wrong"
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: "Something went wrong"
        }
    }
}