'use client'
import React, { useState, useEffect } from "react";
import Loading from "../loading";
import { dummyData } from "../constant/Data";
import { saveAs } from "file-saver";

export default function Results() {
    const [loader, setLoader] = useState(true);
    const [selectedPairs, setSelectedPairs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [theme, setTheme] = useState(false);

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

    const filteredData = dummyData.filter(pair =>
        pair.question.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
        if (sortBy === 'id') {
            return a.id - b.id;
        } else if (sortBy === 'question') {
            return a.question.localeCompare(b.question);
        }
    });

    return (
        <div className="w-full">
            {loader ? (
                <Loading />
            ) : (
                <>
                    <div className="flex justify-evenly items-center mb-3">
                        <input
                            type="text"
                            placeholder="Search any question...."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="ml-3 top-3 border-2 text-black text-xl shadow-2xl border-black bg-gray-100 px-3 py-2 rounded-md mr-3"
                        />
                        <button className="bg-gray-900 font-semibold border-2 border-gray-900 hover:bg-gray-800 p-3 text-white text-xl rounded-xl shadow-2xl m-3 w-fit ml-[40%]" onClick={generateJSONL}>Download Final Data</button>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-gray-200 px-3 py-2 rounded-md"
                        >
                            <option value="id">Sort by ID</option>
                            <option value="question">Sort by Question</option>
                        </select>

                        <div className=" bg-black w-12 rounded-l-full rounded-r-full h-7" >
                            <div onClick={() => {
                                setTheme(!theme)
                            }} className={theme ? "bg-white m-1 ml-6 h-5 w-5 rounded-full" : "bg-white m-1 h-5 w-5 rounded-full"}>
                            </div>
                        </div>

                    </div>
                    <div>
                        <ul className="flex flex-wrap justify-evenly">
                            {filteredData.map(pair => (
                                <li className={!theme ? "border border-black w-[30%] rounded-xl bg-gray-900 text-white text-lg m-3 p-3" : "border border-black w-[30%]  rounded-xl bg-gray-100 text-black text-lg m-3 p-3"} key={pair.id}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedPairs.includes(pair.id)}
                                            onChange={() => handlePairSelection(pair.id)}
                                        />
                                        👍🏻Like
                                        <p className="pt-2 font-bold text-lg">
                                            {"Q." + pair.id + " " + pair.question}
                                        </p>
                                        <p className="font-extralight text-sm">
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
