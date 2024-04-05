"use client";
import { type NextPage } from "next";
import Head from "next/head";

import { useState } from "react";

const Home: NextPage = () => {
  const [downloads, setDownloads] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const getDownloads = async () => {
    const response = await fetch("/api/getDownloads", {
      method: "POST",
      body: JSON.stringify({ input }),
    });
    const { downloads } = await response.json();

    setDownloads(downloads);

    //console.log(downloads);
  };
  return (
    <>
      <Head>
        <title>Example web scraper</title>
        <meta name="description" content="A web scraping POC" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <input
            type="text"
            className="rounded-md border-2 border-gray-300 p-2"
            placeholder="Enter package name"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="button"
            className="rounded-md bg-pink-600 p-4 text-xl font-bold text-white"
            onClick={() => getDownloads()}
          >
            Go
          </button>
          <p className="text-sm text-black">
            {downloads && `This package has ${downloads} weekly downloads.`}
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;

// Puppeteer - expected: 3,764,675
