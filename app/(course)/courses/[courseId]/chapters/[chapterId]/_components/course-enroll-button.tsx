"use client"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type CourseEnrollButtonProps = {
    courseId: string;
    price: number;
}

export const CourseEnrollButton = ({courseId, price}: CourseEnrollButtonProps ) =>{

    const [isLoading,setIsLoading] = useState(false)

    const onClick = async () =>{
        try {
            setIsLoading(true)
            const res = await axios.post(`/api/courses/${courseId}/checkout`)
            window.location.assign(res.data.url)
        } catch (error) {
            toast.error("Something went wrong")
            setIsLoading(false)
            
        }finally{
            setIsLoading(false)
        }
    }
    
    return (
        <Button className="text-white bg-primary hover:bg-primary-dark w-full md:w-auto" size={"sm"} onClick={onClick}>
            Enroll for {formatPrice(price)}
        </Button>
    )
}