import { spiral } from 'ldrs'

spiral.register()



function Loader() {
    return (
        <>
            <l-spiral
                size="40"
                speed="0.9"
                color="blue"
            ></l-spiral>
        </>
    );
}

export default Loader;