import PetCard from "../components/PetCard";
import { useState, useEffect } from "react";
import AddPet from "../components/AddPet";

const Home = () => {
  const [pets, setPets] = useState([
    // {
    //   id: 1,
    //   name: "Moti",
    //   age: 2,
    //   img:
    //     "https://thehappypuppysite.com/wp-content/uploads/2018/10/brown-dog-names-long.jpg",
    //   isFavorite: true,
    // },
    // {
    //   id: 2,
    //   name: "Tiger",
    //   age: 4,
    //   img:
    //     "https://i0.wp.com/ideasfornames.com/wp-content/uploads/2019/11/cute-pet_t20_KoZno3.jpg?ssl=1",
    //   isFavorite: false,
    // },
  ]);

  useEffect(() => {
    const getPets = async () => {
      const pets = await fetchPets();
      setPets(pets);
    };
    getPets();
  }, []);

  //Get Pets
  const fetchPets = async () => {
    const res = await fetch("https://6075d7a60baf7c0017fa7234.mockapi.io/pets");
    const data = await res.json();

    return data;
  };

  const addPet = async (pet) => {
    const res = await fetch(
      "https://6075d7a60baf7c0017fa7234.mockapi.io/pets",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(pet),
      }
    );

    const data = await res.json();
    setPets([...pets, data]);

    // console.log(pet);
    // const id = pets.length + 1;
    // const newPet = { ...pet, id: id };
    // setPets([...pets, newPet]);
  };

  const removePet = async (id) => {
    console.log(`Remove pet ${id}`);

    const res = await fetch(
      `https://6075d7a60baf7c0017fa7234.mockapi.io/pets/${id}`,
      { method: "DELETE" }
    );

    res.status === 200
      ? setPets(pets.filter((pet) => pet.id !== id))
      : alert("Delete Failed");
  };

  const fetchSinglePet = async (id) => {
    const res = await fetch(
      `https://6075d7a60baf7c0017fa7234.mockapi.io/pets/${id}`
    );
    const data = await res.json();
    return data;
  };

  const favoritePet = async (id) => {
    const petToFavorite = await fetchSinglePet(id);
    const updatedFavorite = {
      ...favoritePet,
      isFavorite: !petToFavorite.isFavorite,
    };

    const res = await fetch(
      `https://6075d7a60baf7c0017fa7234.mockapi.io/pets/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedFavorite),
      }
    );

    const data = await res.json();

    setPets(
      pets.map((pet) =>
        pet.id === id ? { ...pet, isFavorite: data.isFavorite } : pet
      )
    );

    // setPets(
    //   pets.map((pet) =>
    //     pet.id === id
    //       ? {
    //           ...pet,
    //           isFavorite: !pet.isFavorite,
    //         }
    //       : pet
    //   )
    // );
  };

  return (
    <div>
      <AddPet onAddPet={addPet} />
      {pets.map((pet) => (
        <PetCard
          pet={pet}
          key={pet.id}
          onRemove={removePet}
          onFavorite={favoritePet}
        />
      ))}
    </div>
  );
};

export default Home;
