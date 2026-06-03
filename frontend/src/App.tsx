import { useState } from "react";
import "./App.css";

function App() {
    return (
        <>
            <header className="container mx-auto bg-red-500 text-white">
                <div className="flex justify-between pt-10  ">
                    <span
                        className="font-bold text-3xl pl-2 cursor-pointer"
                        onClick={() => (window.location.href = "")}
                    >
                        TailWind
                    </span>
                    <div className="space-x-5">
                        <a href="" className="hover:underline">
                            About
                        </a>
                        <a
                            href=""
                            className="bg-gray-500 py-2 px-4 rounded-full hover:bg-gray-700"
                        >
                            Contacts
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
}

export default App;
