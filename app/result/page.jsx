'use client'
import React, { useState, useEffect } from "react";
import Loading from "../loading";
import { dummyData } from "../constant/Data";
import { saveAs } from "file-saver";


export default function Results() {
    const [loader, setLoader] = useState(true);
    const [selectedPairs, setSelectedPairs] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 3000);
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

    const generateJSONL = () => {
        const filteredPairs = dummyData.filter(pair => selectedPairs.includes(pair.id));
        const jsonlData = filteredPairs.map(pair => JSON.stringify(pair)).join('\n');
        const blob = new Blob([jsonlData], { type: 'application/json' });
        saveAs(blob, 'filtered_data.jsonl');
    };

    return (
        <div className="w-full">
            {loader ? (
                <Loading />
            ) : (
                <>
                    <button className="bg-gray-900 font-semibold border-2 border-gray-900 hover:bg-gray-800 p-3 text-white text-xl rounded-xl shadow-2xl m-3 w-fit ml-[40%]" onClick={generateJSONL}>Download Final Data</button>

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
                </>
            )}
        </div>
    );
}
