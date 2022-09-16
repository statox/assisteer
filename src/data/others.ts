import type { GenericObject } from "../types/objects.types";

const OTHERS: GenericObject[] = [
    {
        name: "field shelter",
        type: "other",
        icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/f6/Field_Shelter.png",
        icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/2/23/Icon_Shelter.png",
        wikiUrl: "https://astroneer.fandom.com/wiki/Field_Shelter",
        needs: [{ tool: "small printer", resources: ["silicone", "graphene"] }],
        bytesToUnlock: 8000
    },
    {
        name: "shelter",
        type: "other",
        icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/9/9d/Exo_Habitat.jpg",
        icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/2/23/Icon_Shelter.png",
        wikiUrl: "https://astroneer.fandom.com/wiki/Shelter",
        needs: [{ tool: "large printer", resources: ["silicone", "silicone", "plastic", "plastic"] }],
        bytesToUnlock: 0
    },
    {
        name: "rover seat",
        type: "other",
        icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/0/0f/Astroneer_192.png",
        icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/70/Icon_Rover_Seat.png",
        wikiUrl: "https://astroneer.fandom.com/wiki/Rover_Seat",
        needs: [{ tool: "small printer", resources: ["compound", "compound"] }],
        bytesToUnlock: 0
    },
    {
        name: "winch",
        type: "other",
        icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/35/Winch.jpg",
        icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/0/0e/Icon_Winch.png",
        wikiUrl: "https://astroneer.fandom.com/wiki/Winch",
        needs: [{ tool: "small printer", resources: ["exo chip", "rubber"] }],
        bytesToUnlock: 3750
    },
    {
        name: "paver",
        type: "other",
        icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/c/cd/Paver.png",
        icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/55/Icon_Paver.png",
        wikiUrl: "https://astroneer.fandom.com/wiki/Paver",
        needs: [{ tool: "small printer", resources: ["aluminum alloy", "silicone"] }],
        bytesToUnlock: 5000
    },
    {
        name: "drill strength 1",
        type: "other",
        icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/33/Drill_Strength_1.jpg",
        icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/56/Icon_Drill.png",
        wikiUrl: "https://astroneer.fandom.com/wiki/Drill_Strength_1",
        needs: [{ tool: "small printer", resources: ["ceramic", "tungsten carbide"] }],
        bytesToUnlock: 5000
    },
    {
        name: "drill strength 2",
        type: "other",
        icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/2/2e/Drill_Strength_2.jpg",
        icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/56/Icon_Drill.png",
        wikiUrl: "https://astroneer.fandom.com/wiki/Drill_Strength_2",
        needs: [{ tool: "small printer", resources: ["titanium alloy", "tungsten carbide"] }],
        bytesToUnlock: 5000
    },
    {
        name: "drill strength 3",
        type: "other",
        icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/2/2a/Drill_Strength_3.jpg",
        icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/56/Icon_Drill.png",
        wikiUrl: "https://astroneer.fandom.com/wiki/Drill_Strength_3",
        needs: [{ tool: "small printer", resources: ["titanium alloy", "diamond"] }],
        bytesToUnlock: 7500
    },
    {
        name: "solid fuel thruster",
        type: "other",
        icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/46/Solid_Fuel_Thruster.png",
        icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/e/ea/Icon_Thruster.png",
        wikiUrl: "https://astroneer.fandom.com/wiki/Solid-Fuel_Thruster",
        needs: [{ tool: "small printer", resources: ["ammonium", "aluminum"] }],
        bytesToUnlock: 500
    },
    {
        name: "hydrazine thruster",
        type: "other",
        icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/c/ca/HydrazineThruster.png",
        icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/e/ea/Icon_Thruster.png",
        wikiUrl: "https://astroneer.fandom.com/wiki/Hydrazine_Thruster",
        needs: [{ tool: "small printer", resources: ["exo chip", "steel"] }],
        bytesToUnlock: 3750
    },
    {
        name: "landing pad",
        type: "other",
        icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/4f/Landing_Pad.png",
        icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/fb/Icon_Landing_Pad.png",
        wikiUrl: "https://astroneer.fandom.com/wiki/Landing_Pad",
        needs: [{ tool: "large printer", resources: ["ceramic", "ceramic", "aluminum"] }],
        bytesToUnlock: 750
    },
    {
        name: "rail station",
        type: "other",
        icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/b/bb/Rail_Station.png",
        icon2: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/1a/Icon_Rail_Station.png",
        wikiUrl: "https://astroneer.fandom.com/wiki/Rail_Station",
        needs: [{ tool: "large printer", resources: ["titanium", "titanium", "copper", "quartz"] }],
        bytesToUnlock: 2500
    },
]

export { OTHERS };
