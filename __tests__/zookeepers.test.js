const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers')
const {zookeepers} = require('../data/zookeepers.json');
jest.mock('fs')

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        {name: "Samara", id: "bfevg8"},
        zookeepers
    )

    expect(zookeeper.name).toBe('Samara')
    expect(zookeeper.id).toBe('bfevg8')
})

test("filters by query", () => {
    const startingZookeepers = [
        {
            "id": "2",
            "name": "Isabella",
            "age": 67,
            "favoriteAnimal": "bear"
        },
        {
            "id": "3",
            "name": "Linda",
            "age": 48,
            "favoriteAnimal": "otter"
        }
    ];
    const updatedZookeepers = filterByQuery({favoriteAnimal: "otter"}, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1)
})

test("finds by ID", () => {
    const startingZookeepers = [
        {
            "id": "2",
            "name": "Isabella",
            "age": 67,
            "favoriteAnimal": "bear"
        },
        {
            "id": "3",
            "name": "Linda",
            "age": 48,
            "favoriteAnimal": "otter"
        }
    ];
    const result = findById("3", startingZookeepers)

    expect(result.name).toBe("Linda")
})

test("validates age", () => {
    const zookeeper = {
        "id": "2",
        "name": "Isabella",
        "age": 67,
        "favoriteAnimal": "bear"
    };

    const invalidZookeeper = {
        "id": "2",
        "name": "Isabella",
        "age": "67",
        "favoriteAnimal": "bear"
    };

    const result = validateZookeeper(zookeeper)
    const result2 = validateZookeeper(invalidZookeeper)

    expect(result).toBe(true)
    expect(result2).toBe(false)
})