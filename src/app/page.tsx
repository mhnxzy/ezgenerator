"use client";

import { generateRandomString, TLetterCase } from "@/app/libs/generator";
import { useState } from "react";

const Home = () => {
   const [length, setLength] = useState<number>(16);
   const [letterCase, setLetterCase] = useState<TLetterCase>("random");
   const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);

   const [result, setResult] = useState<string>("");
   const [copied, setCopied] = useState<boolean>(false);

   const handleGenerate = () => {
      const value = generateRandomString(length, letterCase, includeNumbers);

      setResult(value);
      setCopied(false);
   };

   const handleCopy = async () => {
      if (!result || copied) return;

      await navigator.clipboard.writeText(result);

      setCopied(true);

      setTimeout(() => {
         setCopied(false);
      }, 1500);
   };

   return (
      <main className="min-h-screen px-4 py-8">
         <div className="mx-auto w-full max-w-2xl">
            <header className="text-center mb-8">
               <div className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Random String Generator
               </div>

               <div className="text-xs sm:text-sm">
                  Generate random strings with custom options
               </div>
            </header>

            <div className="rounded-lg bg-gray-900 p-4 shadow-lg sm:p-6 shadow-black">
               <div className="space-y-4">
                  <section className="rounded-md shadow-sm shadow-black bg-gray-800 p-2 sm:p-4">
                     <div className="text-sm mb-1">Length: {length}</div>

                     <input
                        id="length"
                        type="range"
                        min={1}
                        max={128}
                        value={length}
                        onChange={(event) =>
                           setLength(Number(event.target.value))
                        }
                        className="w-full"
                     />

                     <div className="flex justify-between text-xs text-gray-400">
                        <span>1</span>
                        <span>128</span>
                     </div>
                  </section>

                  <section className="flex flex-row justify-between rounded-md shadow-sm shadow-black bg-gray-800 p-2 sm:p-4 items-center">
                     <div>
                        <p className="text-sm">Numbers</p>

                        <p className="text-xs text-gray-400">
                           Include numbers 0-9
                        </p>
                     </div>

                     <button
                        type="button"
                        role="switch"
                        aria-checked={includeNumbers}
                        onClick={() => setIncludeNumbers((value) => !value)}
                        className={`relative h-6 w-11 rounded-full transition-all duration-200 ${
                           includeNumbers ? "bg-gray-200" : "bg-gray-600"
                        }`}
                     >
                        <div
                           className={`absolute top-1 h-4 w-4 rounded-full transition-all duration-200 ease-in-out ${
                              includeNumbers
                                 ? "left-6 bg-green-500"
                                 : "left-1 bg-red-500"
                           }`}
                        />
                     </button>
                  </section>

                  <section className="rounded-md shadow-sm shadow-black bg-gray-800 p-2 sm:p-4">
                     <p className="text-sm mb-1">Letter Case</p>

                     <div className="grid grid-cols-3 gap-1 rounded-md bg-gray-700 p-1">
                        {(
                           [
                              ["lowercase", "Lowercase"],
                              ["uppercase", "Uppercase"],
                              ["random", "Random"],
                           ] as const
                        ).map(([value, label]) => (
                           <button
                              key={value}
                              type="button"
                              onClick={() => setLetterCase(value)}
                              className={`rounded-md py-2 text-sm font-semibold transition ${
                                 letterCase === value
                                    ? "bg-blue-500"
                                    : "text-gray-400 hover:bg-gray-800/50 hover:text-white hover:cursor-pointer"
                              }`}
                           >
                              {label}
                           </button>
                        ))}
                     </div>
                  </section>

                  <section className="flex flex-col gap-2">
                     <div className="break-all bg-gray-400 text-black p-4 text-xs rounded-md">
                        {result || (
                           <span className="">
                              Generated string will appear here
                           </span>
                        )}
                     </div>

                     <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
                        <button
                           type="button"
                           onClick={handleGenerate}
                           className="rounded-md shadow-sm hover:bg-blue-500/75 shadow-black transition bg-blue-500 py-2 cursor-pointer active:scale-99"
                        >
                           Generate String
                        </button>
                        <button
                           type="button"
                           disabled={!result || copied}
                           onClick={handleCopy}
                           className={`rounded-md bg-blue-500 py-2 shadow-sm shadow-black transition ${
                              !result || copied
                                 ? "cursor-not-allowed"
                                 : "cursor-pointer hover:bg-blue-500/75 active:scale-99"
                           }`}
                        >
                           {copied ? "Copied!" : "Copy"}
                        </button>
                     </div>
                  </section>
               </div>
            </div>
         </div>
      </main>
   );
};

export default Home;
