import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Import axios
import Aos from "aos";
import ApexChartDonut from "./chartDonut";
import ApexChartPolar from "./chartPolarArea";
import Ability from "./ability";

const Pokemon = () => {
    const { name } = useParams();
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [card, setCard] = useState(false);
    const [zIndex, setZIndex] = useState(false);
    const [color, setColor] = useState(false);
    const [bgColor, setBgColor] = useState(false);

    const getDataByName = async () => {
        try {
            let response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${name}/`
            );
            setPokemonData(response.data);
            console.log(response.data);

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getCard = () => {
        setZIndex(true);
        setColor(true);
        setCard(true);
        setBgColor(true);
    };

    useEffect(() => {
        Aos.init();
        getDataByName();
    }, [name]);

    if (loading) {
        return (
            <div className="text-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <>
            <section
                className="w-full flex justify-center h-screen "
                data-aos="flip-left"
            >
                <div
                    className={`text-center ${
                        bgColor ? "bg-blue-400" : "bg-slate-200"
                    }  shadow-2xl mt-10 p-5 rounded-md  h-[50%] duration-500 ${
                        card ? "ml-[63rem]" : "ml-0"
                    } `}
                >
                    <img
                        className="ml-10"
                        width={300}
                        src={pokemonData.sprites.front_default}
                        alt={pokemonData.name}
                    />

                    <h2 className="text-3xl font-bold">{pokemonData.name}</h2>

                    <div className=" flex gap-2 mt-2 justify-center">
                        <p
                            className={`${
                                color
                                    ? "bg-red-500  text-white "
                                    : "text-black bg-yellow-200"
                            } px-4 py-1 rounded-md shadow-lg`}
                        >
                            Height: {pokemonData.height}
                        </p>
                        <p
                            className={`${
                                color
                                    ? "bg-red-500  text-white "
                                    : "text-black bg-yellow-200"
                            } px-4 py-1 rounded-md shadow-lg`}
                        >
                            Weight: {pokemonData.weight}
                        </p>
                        <p
                            className={`${
                                color
                                    ? "bg-red-500  text-white "
                                    : "text-black bg-yellow-200"
                            } px-4 py-1 rounded-md shadow-lg`}
                        >
                            Type:{" "}
                            {pokemonData.types
                                .map((type) => type.type.name)
                                .join(", ")}
                        </p>
                    </div>

                    <div className={`drawer ${zIndex ? "-z-10" : "z-10"} `}>
                        <input
                            id="my-drawer"
                            type="checkbox"
                            className="drawer-toggle"
                        />
                        <div className="drawer-content mt-5  rounded-sm py-2 ">
                            <label
                                onClick={getCard}
                                htmlFor="my-drawer"
                                className="hover:bg-red-600 w-full bg-red-500 text-white mt-4 rounded-sm px-10 py-2 my-4"
                            >
                                Show Detail
                            </label>
                        </div>

                        <div className="drawer-side   ">
                            <label
                                htmlFor="my-drawer"
                                aria-label="close sidebar"
                            ></label>
                            <ul className="menu bg-base-200 text-base-content min-h-full w-[55%] p-4  pt-30 ">
                                <p className=" text-4xl font-bold w-full bg-blue-500 text-white mt-4 rounded-sm px-10 py-2 my-4">
                                    {pokemonData.name}
                                </p>

                                <section className="flex justify-center gap-3">
                                    <p className="pt-2 font-bold">
                                        {" "}
                                        Base Experience :{" "}
                                        <span className="bg-red-500 p-2 rounded-md  text-white text-center font-bold text-md mb-2">
                                            {" "}
                                            {pokemonData.base_experience}
                                        </span>
                                    </p>
                                    <div className="flex justify-start gap-2 bg-yellow-2">
                                        <p className="pt-2 font-bold">
                                            Abilities :{" "}
                                        </p>
                                        <Ability
                                            ability={pokemonData.abilities}
                                        />
                                    </div>
                                </section>

                                <section
                                    id="chart"
                                    className="flex justify-center gap-6"
                                >
                                    <ApexChartPolar stats={pokemonData.stats} />
                                    <ApexChartDonut stats={pokemonData.stats} />
                                </section>
{/* 
                                <div className="flex justify-center mt-2 ml-5 rounded-md bg-green-500 w-[20%] hover:bg-green-600 text-white text-md font-bold py-2 px-10 ">
                                    <Link to={`/catch/${pokemonData.name}`}>
                                        <p> Catch Pokemon</p>
                                    </Link>

                                </div> */}


                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Pokemon;
