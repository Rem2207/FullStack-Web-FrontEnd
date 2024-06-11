"use server"
import { revalidatePath } from 'next/cache'

export const revalidateClientPath = (path)=>{
    console.log(path);
    revalidatePath(path)
}