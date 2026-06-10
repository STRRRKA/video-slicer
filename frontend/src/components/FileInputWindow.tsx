import { useRef, useState } from "react";
import type { DragEvent, ChangeEvent } from "react";

export const FileInputWindow = () => {
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const inputManualRef = useRef<HTMLInputElement | null>(null);
    const defaultText = "Перетащи файл сюда или нажми, чтобы выбрать";
    const [name, setName] = useState(defaultText);
    const [file, setFile] = useState<string | File>("");
    const [isHover, setIsHover] = useState(false);
    //отправка на сервер
    const sendFile = async () => {
        try {
            if (!file) {
                throw "Чтобы продолжить выберите видео для нарезки";
                return;
            }
            const form = new FormData();
            form.append("file", file);
            const responce = await fetch("http://127.0.0.1:5000/", {
                method: "POST",
                body: form,
            });
        } catch (err) {
            alert(err);
        }
    };
    //очистка инпута для ручного ввода
    const clearManualInput = () => {
        if (inputManualRef.current) {
            inputManualRef.current.value = "";
            inputManualRef.current.blur();
        }
    };

    //пользователь вводит ссылку на файл вручную
    const manualFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            // пользователь стёр всё
            setName(defaultText);
            setFile("");
            return;
        }
        setName(e.target.value);
        setFile(e.target.value);
    };
    //сеттеры файла и валидация
    const processFile = (file: File | undefined | null) => {
        if (!file) return;

        if (!file.type.startsWith("video/")) {
            alert("Можно загружать только видеофайлы");
            return;
        }

        setName(file.name);
        setFile(file);
        clearManualInput();
    };
    //ручной выбор файла на устройстве
    const onChooseFile = (e: ChangeEvent<HTMLInputElement>) => {
        processFile(e.target.files?.[0]);
    };
    //пользователь сбросил файл в дропзону
    const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsHover(false);

        processFile(e.dataTransfer.files[0]);
    };

    const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const addHover = () => {
        setIsHover(true);
    };

    const removeHover = () => {
        setIsHover(false);
    };

    const inputClick = () => {
        inputFileRef.current?.click();
    };

    return (
        <section className="h-1/2 w-1/2 container mx-auto flex flex-col gap-4">
            <span className="text-2xl sm:text-5xl border-b p-2">
                Шаг 1. Загрузи видео.
            </span>
            <div
                onDragEnter={addHover}
                onDragLeave={removeHover}
                onDragOver={onDragOverHandler}
                onDrop={onDropHandler}
                className={`h-2/5 mx-2 p-2 flex-1 flex justify-center items-center border border-dashed rounded-xl cursor-pointer ${
                    isHover ? "bg-hover" : ""
                }`}
                onClick={inputClick}
            >
                <span className="text-sm sm:text-xl pointer-events-none">
                    {name}
                    <input
                        type="file"
                        className="hidden"
                        ref={inputFileRef}
                        onChange={onChooseFile}
                        accept="video/*"
                    />
                </span>
            </div>
            <input
                type="text"
                name="file"
                className="text-sm sm:text-xl mx-2 p-2 border rounded-2xl"
                placeholder="Или введи ссылку на видео"
                onChange={manualFileInput}
                ref={inputManualRef}
            />
            <button
                onClick={sendFile}
                className="w-fit mx-auto mb-4 p-2 border rounded-2xl hover:bg-hover duration-400 ease-in cursor-pointer"
            >
                Нарезать
            </button>
        </section>
    );
};
