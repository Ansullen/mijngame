import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/water.jpg'),
    Fish: new ImageSource('images/fish.png'),
    Shark: new ImageSource('images/shark.png'),
    Bubble: new ImageSource('images/bubble.png'),
    Mine: new ImageSource('images/mine.png'),
    Bones: new ImageSource('images/bones.png')
}


const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }