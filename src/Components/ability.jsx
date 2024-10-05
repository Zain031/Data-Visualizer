import axios from "axios";
import React, { useEffect, useState } from "react";

const Ability = ({ ability }) => {
    const [effect, setEffect] = useState("");
    const [effect2, setEffect2] = useState("");

    const showAbility = async (url) => {
        const response = await axios.get(url);
        console.log(response.data.effect_entries[1]);
        setEffect(response.data.effect_entries[1].effect);
        setEffect2(response.data.effect_entries[1].short_effect);
    };

    // const modalShow = (url) => {
    //     showAbility(url);
    //     document.getElementById("my_modal_2").showModal();
    // };

    useEffect(() => {
        showAbility(ability[0].ability.url);
    }, []);

    return (
        <>
            {ability.map((item) => {
                return (
                    <>
                        <div className="dropdown dropdown-hover">
                            <div tabIndex={0} role="button" className="bg-red-500 p-2 rounded-md  text-white text-center font-bold text-md mb-2">
                                {" "}
                                {item.ability.name}
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[27rem] p-2 shadow"
                            >
                                <li>
                                    <a> short effect <br />{effect }</a>
                                </li>
                                <li>
                                    <a>long effect <br />{effect2 }</a>
                                </li>
                            </ul>
                        </div>
                    </>
                );
            })}
        </>
    );
};

export default Ability;
