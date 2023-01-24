import React, { SetStateAction } from "react";
import Image from "next/image";
import { getContent } from "../pages";
interface PicData {
  name: string;
  about: string;
  Link: string;
}

interface galeryProps {
  content: any;
  setScreen: any;
}

function Galery(props: galeryProps) {
  return (
    <div className="flex h-80 w-full flex-col border-2 border-gray-200  items-center">
      <div>
        <h2 className="text-4xl font-bold">{props.content && getContent("כותרת לגלריה", props.content, "text")}</h2>
        <div className="flex gap-20">
          {" "}
          <p>{props.content && getContent("טקסט לגלריה", props.content, "text")}</p>
          <button
            className="border-pink-100 border-2 border-x-4 hover:bg-slate-300"
            onClick={() => {
              props.setScreen({ galery: false });
            }}
          >
            חזור
          </button>
        </div>
      </div>
      {props.content?.data ? (
        props.content.data.pics.map((picData: PicData) => (
          <div className="flex flex-col h-full items-center" key={picData.name}>
            <div className="flex gap-4">
              <p>{picData.name}</p>
              <p>{picData.about}</p>
            </div>
            <div className="relative h-1/2 w-1/2">
              <Image src={picData.Link} alt={""} fill />
            </div>
          </div>
        ))
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

export default Galery;
