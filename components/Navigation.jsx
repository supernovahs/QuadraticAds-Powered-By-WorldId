import React from "react";
import Link from "next/router";
export default function Navigation() {
  const menu = [{ tabName: "Ads", pageName: "/" }];

  return (
    <>
      <div className=" menu flex justify-center border-b-4 border-black mt-6 ">
        {menu.map((tab) => {
          return (
            <div>
              <p
                key={tab.pageName}
                className=" text-2xl  font-mono border-4 border-rose-500 border-dotted p-0.5  mx-3 m-2 font-bold rounded-lg hover:bg-yellow-300 active:bg-yellow-300 focus:outline-none"
              >
                <Link href={tab.pageName}>
                  <a>{tab.tabName}</a>
                </Link>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
