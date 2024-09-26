//Controllers handle the logic related to data manipulation
//and sends the info back to the routes

//Simple data for heros example
const heros = [
    {
        id: 0,
        name: "The Hulk",
        superpower: "Gets mad and green",
        powerLevel: 8,
    },
    {
        id: 1,
        name: "Mr. Incredible",
        superpower: "Gets mad but not green",
        powerLevel: 6
    }
];

function getAllHeros() {
    return heros;
    //SELECT * FROM heros;
}

function getSingleHero(heroId) {
    //Try to find a hero in our data that has the provided heroId
    const hero = heros.find((hero) => hero.id == heroId);
    //SELECT * FROM heros WHERE id = heroId;
    
    //Check if we found a hero that matches, or not
    if (hero) {
        return hero;
    } else {
        return null;
    }
}

/**
 * 
 * @param {Object} incomingHero An object that we hope to use to update a pre-existing hero 
 * @returns An object that indicates success and a message about what occured
 */
function updateHero(incomingHero) {
    //Finds the hero that matches the incomingHero
    const matchingHeroIndex = heros.findIndex((hero) => hero.id == incomingHero.id);

    //Checks that the incomingHero data is valid, and that it matches an existing hero in our exampleData
    if (incomingHero.name 
        && incomingHero.superpower 
        && incomingHero.powerLevel 
        && matchingHeroIndex != -1
    ) {
        //Go to the exact index within the array, and replace that element with the incomingHero
        heros.splice(matchingHeroIndex, 1, incomingHero);
        return {
            success: true,
            message: `Updated hero - ${incomingHero.name}:${incomingHero.id}`
        };
    } else {
        return {
            success: false,
            message: `Could not find hero, or invalid hero data - ${incomingHero.name}:${incomingHero.id}`
        };
    }

}

/**
 * 
 * @param {Object} incomingHero An object that hopes to be added to the heros array
 * @returns An object that indicates success and a message about what occured
 */
function createNewHero(incomingHero) {
    //If the new hero has valid data
    if ((incomingHero.name && incomingHero.superpower && incomingHero.powerLevel >= 0)
        //also check that the hero does NOT already exist within the array
        && !heros.find((hero) => hero.id == incomingHero.id)
    ) {
        //Ensure that the incoming hero's id is the next available index in our array
        incomingHero.id = heros.length;
        //Adds the hero to the array
        heros.push(incomingHero);
        return {
            success: true,
            message: `Created hero - ${incomingHero.name}:${incomingHero.id}`
        };
    } else {
        return {
            success: false,
            message: `Could not create hero - ${incomingHero.name}:${incomingHero.id}`
        };
    }
}

function deleteHero(id) {
    const index = heros.findIndex((hero) => hero.id == id);

    if (index != -1) {
        heros.splice(index, 1);
        return {
            succes: true,
            message: `Deleted hero - ${id}`
        }
    } else {
        return {
            succes: false,
            message: `Could not find hero to delete - ${id}`
        }
    }
}

//Export all the controller functions
module.exports = {
    getAllHeros,
    getSingleHero,
    updateHero,
    createNewHero,
    deleteHero
}