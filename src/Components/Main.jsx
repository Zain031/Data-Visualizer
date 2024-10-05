import Aos from "aos";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { Navbar } from "./Navbar";

const Main = () => {
    const [data, setData] = useState([]);
    const [pokemon, setPokemon] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 20;
    const isRootPath = location.pathname === "/";

    const fetchData = async (page = 1) => {
        const offset = (page - 1) * limit; // Menghitung offset berdasarkan halaman
        try {
            let response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
            );
            console.log(response.data.results);
            setData(response.data.results);
            setTotalPages(Math.ceil(response.data.count / limit));
        } catch (error) {
            console.log(error);
        }
    };

    const getPokemon = () => {
        setPokemon(true);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    useEffect(() => {
        Aos.init();
        fetchData(currentPage);
    }, [currentPage]);

    return (
        <>
            <Navbar />

            <section
                id="sidebar"
                className="bg-red-500 flex flex-wrap justify-center gap-2 py-4 "
            >
                {data.map((item) => {
                    return (
                        <Link key={item.name} to={`/pokemon/${item.name}`}>
                            <div
                                data-aos="flip-left"
                                className="bg-yellow-100 my-1 py-2 px-6 rounded-md hover:bg-yellow-200 hover:scale-110 hover:duration-100 hover:cursor-pointer"
                            >
                                <p>{item.name}</p>
                            </div>
                        </Link>
                    );
                })}
            </section>

            {/* Tombol Pagination */}
            <div className="flex justify-center space-x-4 py-4 shadow-xl">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={` px-5 py -2  rounded-md hover:bg-blue-600 bg-blue-500 text-white ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    Previous
                </button>
                <div className="bg-orange-100 py-2 px-4 rounded-md font-bold text-xl text-slate-600">
                    {currentPage - 1}
                </div>

                <div className="bg-orange-200 py-3 px-5 rounded-md font-bold text-xl text-slate-800">
                    {currentPage}
                </div>

                <div className="bg-orange-100 py-2 px-4 rounded-md font-bold text-xl text-slate-600">
                    {currentPage + 1}
                </div>

                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-5 py -2  rounded-md bg-blue-500 hover:bg-blue-600 text-white ${
                        currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                    }`}
                >
                    Next
                </button>
            </div>

            {isRootPath && (
                <section id="image" className="relative">
                    <div className="flex justify-center opacity-10">
                        <img
                            style={{ width: 1500 }}
                            src="https://static.vecteezy.com/ti/vettori-gratis/p1/29167297-pokemon-logo-design-gratuito-vettoriale.jpg"
                            alt="Pokemon logo"
                        />
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-center">
                        {pokemon ? (
                            <>
                                <div className="ml-36 pb-48 animate-bounce">
                                    <FaArrowAltCircleUp size={50} />
                                </div>
                                <h2 className="text-2xl font-bold mb-4">
                                    Choose your Pokemon
                                </h2>
                                <p>
                                    Select the best Pokemon for your adventure!
                                </p>
                            </>
                        ) : (
                            <button
                                onClick={getPokemon}
                                className="btn btn-primary text-lg"
                            >
                                Choose your Pokemon
                            </button>
                        )}
                    </div>
                </section>
            )}
        </>
    );
};

export default Main;
