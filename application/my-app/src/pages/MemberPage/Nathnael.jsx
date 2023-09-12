import NathnaelImage from '../../images/Nathnael.png';

export default function Nathnael() {
    return (
        <div className='grid grid-cols-1 gap-2'>
            <div className='flex justify-center'><img src={NathnaelImage} alt="Nathnael" width="300" /></div>


            <div className="grid grid-cols-5 gap-2 font-mono text-2xl text-green-500">
                <h3 className='col-start-3 text-center'>Nathnael Gebre</h3>

            </div>

            <div className="grid grid-cols-3 gap-2">
                <p className="col-start-2 text-center border-solid border-2 border-black rounded-tl-lg rounded-tr-lg">
                    Hi Everyone!
                    <br></br>
                    I have been a CS student for 4 years now, I am enjoying CS more now that I can actually code....
                    <br></br>
                    I hope to build something valuable.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-2 ">
                <h4 className='col-start-2 text-center border-solid border-2 border-indigo-600 rounded-full'>My skills: <br></br>
                    <ul>
                        <li>Java</li>
                        <li>C++</li>
                        <li>R</li>
                        <li>Python</li>
                        <li>Javascript / Typescript</li>
                    </ul>
                </h4>


            </div>

            <div className="grid grid-cols-3 gap-2 ">
                <h4 className='col-start-2 text-center border-solid border-2 border-black rounded-br-lg rounded-bl-lg'>My Social Links: <br></br>
                    <p><a href="https://www.linkedin.com/in/nathnael-gebre-6348b41a6/" target="_blank" rel="noreferrer">LinkedIn</a></p>
                    <p><a href="https://github.com/natyfbg" target="_blank" rel="noreferrer">GitHub</a></p>
                </h4>

            </div>


        </div>
    );
};
