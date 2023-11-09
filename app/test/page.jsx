"use client";
import axios from "axios";
import { Suspense, useState } from "react";

export default function Test() {
  const [ss, setss] = useState([]);
  const api = async () => {
    const d = new Date();
    console.log(d);
    const apiA = await axios.get("https://jsonplaceholder.org/posts");
    setss(apiA.data);
    console.log(apiA.data);
    const ds = (new Date() - d) / 1000;
    console.log(ds);
  };

  return (
    <div>
      <p>Hello World</p>
      <button
        onClick={() => {
          api();
        }}
      >
        click
      </button>
      <Suspense fallback={<div>Loading ...</div>}>
        <div>
          {ss.map((e, k) => {
            return (
              <div key={k}>
                {e.id} - {e.category} - {e.publishedAt} - {e.slug}- {e.status} -{" "}
                {e.status} - {e.updatedAt} - {e.url}
              </div>
            );
          })}
        </div>
      </Suspense>
    </div>
  );
}
