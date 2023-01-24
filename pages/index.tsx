import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Galery from "../components/Galery";

const Home: NextPage = () => {
  const content = useQuery({ queryKey: ["content"], queryFn: () => getSiteContent("type=getcontent") });
  const [screen, setScreen] = useState({
    galery: false,
  });
  return (
    <div dir="rtl" className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>ניריתה</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!screen.galery ? (
        <main dir="rtl" className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="text-6xl font-bold">
            {content.data && getContent("ליד הלוגו", content, "text")}
            <a className="text-blue-600" href="">
              {content.data && getContent("לוגו", content, "text")}
            </a>
          </h1>

          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
            <a
              onClick={() => setScreen({ ...screen, galery: true })}
              className="mt-6 w-96 rounded-xl border p-6  hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">גלריה &rarr;</h3>
              <p className="mt-4 text-xl">{content.data && getContent("טקסט לכפתור גלריה", content, "text")}</p>
            </a>

            <a href="" className="mt-6 w-96 rounded-xl border p-6  hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">הזמן שמלה &rarr;</h3>
              <p className="mt-4 text-xl">{content.data && getContent("טקסט להזמן שמלה", content, "text")}</p>
            </a>
          </div>
        </main>
      ) : (
        <Galery content={content} setScreen={setScreen} />
      )}

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};

export default Home;

export const getSiteContent = async (keys: string) =>
  await axios
    .get(
      "https://script.google.com/macros/s/AKfycbwxw8IM4cw-e3jHiKqP7oUlC9tR99P1crVRejfSucaT97LhYBNrrL6NP_IcLhTC2DMk/exec?" +
        keys,
      { withCredentials: false }
    )
    .then((res) => {
      console.log({ res });
      console.log("res.data ", res.data);
      return res.data;
    });

export const getContent = (key: string, pageContent: any, _type: "text" | "pics") => {
  console.log({ key, pageContent, _type });
  if (_type === "text") {
    const text = pageContent.data?.texts.filter((row: siteContentRow) => row.header == key)[0]?.content;
    console.log({ text });
    return text;
  }
};
