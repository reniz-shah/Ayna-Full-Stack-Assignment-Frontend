import { spiral } from 'ldrs'
import './Loading.css'

spiral.register()



function Loader() {
    return (
        <>
            <div className='Loader'>
                <l-spiral
                    size="50"
                    speed="0.9"
                    color="#022C4B"
                ></l-spiral>
            </div>
        </>
    );
}

export default Loader;