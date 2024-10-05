import React from "react";

const Hero = () => {
    return (
        <>
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
                            <p>Select the best Pokemon for your adventure!</p>
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
        </>
    );
};

export default Hero;
