'use client'
import React, { useState, useEffect } from "react";
import Loading from "../loading";
import { dummyData } from "../constant/Data";

export default function Results() {
    const [loader, setLoader] = useState(true);
    const [selectedPairs, setSelectedPairs] = useState([]);
    const [likedPairs, setLikedPairs] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);


    const handlePairSelection = (pairId) => {
        const pairIndex = selectedPairs.indexOf(pairId);
        if (pairIndex === -1) {
            setSelectedPairs([...selectedPairs, pairId]);
        } else {
            const updatedPairs = [...selectedPairs];
            updatedPairs.splice(pairIndex, 1);
            setSelectedPairs(updatedPairs);
        }
    };

    const handleLike = (pairId) => {
        setLikedPairs([...likedPairs, pairId]);
    };

    const generateJSONL = () => {
        const filteredPairs = dummyData.filter(pair => selectedPairs.includes(pair.id));
        const jsonlData = filteredPairs.map(pair => JSON.stringify(pair)).join('\n');
        const blob = new Blob([jsonlData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'filtered_data.jsonl');
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full">
            {loader ? (
                <Loading />
            ) : (
                <>
                    <button className="bg-green-600 font-semibold border-2 border-gray-900 hover:bg-green-700 p-3 text-white text-xl rounded-xl shadow-2xl m-3 w-fit ml-[40%]" onClick={generateJSONL}>Download Final Data</button>

                    <div>
                        <ul>
                            {dummyData.map(pair => (
                                <li className="border border-black w-fit rounded-xl bg-gray-900 text-white text-lg m-3 p-3" key={pair.id}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedPairs.includes(pair.id)}
                                            onChange={() => handlePairSelection(pair.id)}
                                        />
                                        👍🏻Like
                                        <p className="pt-2 font-bold text-xl">
                                            {"Q." + pair.id + " " + pair.question}
                                        </p>
                                        <p className="font-light text-md">
                                            Answer- {pair.answer}
                                        </p>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <ul>
                        {dummyData.map((item, index) => (
                            likedPairs.includes(item.id) && (
                                <li className="" key={index}>
                                    <p>
                                        <strong>{item.question}</strong>
                                    </p>
                                    {item.answer}
                                </li>
                            )
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
