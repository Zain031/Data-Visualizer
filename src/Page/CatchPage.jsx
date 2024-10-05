import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApexChart from "../Components/chartPolarArea";

const CatchPage = () => {
    const { name } = useParams();
    const [pokemonData, setPokemonData] = useState(null);

    const getDataByName = async () => {
        try {
            let response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${name}/`
            );
            setPokemonData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDataByName();
    }, [name]);

    return (
        <>
            <ApexChart />
            {pokemonData ? (
                <>
                    <h1>{pokemonData.name}</h1>
                    <img
                        src={pokemonData.sprites.front_default}
                        alt={pokemonData.name}
                    />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default CatchPage;
