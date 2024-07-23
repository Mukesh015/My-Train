import { Tienne } from "next/font/google"
import React from "react"



const Traveller = () => {
    const travellerCateories = [
        {
            title: "Adult",
            age: "12+ years",
        },
        {
            title: "Children",
            age: "2-12 years",
        },
        {
            title: "Infants",
            age: "0-2 years",
        },

    ]
    return (
        <>
            <div>
                {travellerCateories.map((title, idx) => (
                    <div key={idx} className="flex justify-around mt-6">
                        <div>
                            <p className="font-serif font-normal">{title.title}</p>
                            <p>{title.age}</p>
                        </div>
                        <div className="flex items-center ml-8"> {/* Added ml-4 for left margin */}
                            <div className="rounded-full bg-gray-200 p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-440v-80h560v80H200Z" /></svg>
                            </div>
                            <p style={{ margin: "0 8px" }}>1</p>
                            <div className="rounded-full bg-blue-200 p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Traveller