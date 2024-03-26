"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TextInputPage = () => {
  const [textInput, setTextInput] = useState("");
  const route = useRouter();

  const handleChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    route.push("/result");
    console.log(textInput);
    setTextInput("");
  };

  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-xl font-serif font-semibold">
        {" "}
        Input any small/large text:
      </h1>
      <form
        className="border p-2 rounded-2xl border-gray-900 "
        onSubmit={handleSubmit}
      >
        <textarea
          className="text-md p-2"
          value={textInput}
          onChange={handleChange}
          rows={15}
          cols={60}
          placeholder="Enter your text here..."
        />
        <br />
        <button
          disabled={!textInput ? true : false}
          className={
            !textInput
              ? `cursor-not-allowed text-lg font-semibold w-full text-white bg-black p-2 rounded-lg shadow-2xl hover:bg-gray-900`
              : `cursor-pointer text-lg font-semibold w-full text-white bg-black p-2 rounded-lg shadow-2xl hover:bg-gray-900b`
          }
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TextInputPage;
