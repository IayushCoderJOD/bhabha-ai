'use client'
import React from 'react'
import { useRouter } from "next/navigation";


const CompanyIcon = () => {
    const route = useRouter();
    return (
        <div>
            <img
                onClick={() => {
                    route.push("/");
                }}
                className="h-20"
                src="https://bhabha.ai/images/light_full_logo.webp"
            />
        </div>
    )
}

export default CompanyIcon