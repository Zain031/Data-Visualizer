import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
    return (
        <>
            <header className="flex justify-center gap-5">
                <div className=" py-4  text-center bg-white">
                    <Link to="/">
                        <h2 className="text-5xl text-slate-800 ">
                            <b>Pokemon</b>
                        </h2>
                    </Link>
                </div>
               
            </header>
        </>
    );
};
