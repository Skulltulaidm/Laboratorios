import { heroes } from './data/airports.js';

export function MyApp() {
    console.log(heroes);

    const getHeroeById = (id) => heroes.find((heroe) => heroe.id === id);
    console.log(getHeroeById(2));

    const getHeroesByOwner = (owner) => heroes.filter((heroe) => heroe.owner === owner);
    console.log(getHeroesByOwner('DC'));
}