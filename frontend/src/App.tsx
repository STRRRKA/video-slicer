import { useState } from "react";
import "./App.css";
import { FileInputWindow } from "./components/FileInputWindow";
import { FileOutputWindow } from "./components/FileOutputWindow";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <main className="bg-back text-font h-screen w-screen flex flex-col justify-center">
                <FileInputWindow />
                <FileOutputWindow />
            </main>
        </>
    );
}

export default App;
