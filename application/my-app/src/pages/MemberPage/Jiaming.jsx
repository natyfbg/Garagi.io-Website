import JiamingImage from '../../images/Jiaming.jpg';

export default function Jiaming() {
    return (
        <div className='grid grid-cols-1 gap-2'>
            <div className='flex justify-center'><img src={JiamingImage} alt="Jiaming" width="300" /></div>
        
            <br></br>
            <div className="grid grid-cols-5 gap-2 font-mono text-2xl text-pink-400">
                <h3 className='col-start-3 text-center'>Jiaming Zhao</h3>

            </div>

            <div className="grid grid-cols-3 gap-2">
                <p className="col-start-2 text-center border-solid border-2 border-black rounded-tl-lg rounded-tr-lg">
                    Hello, everyone!
                    <br></br>
                    I am a SFSU student, and I love to play video game so I have interesting in Computer Sciences.
                    <br></br>
                    I love anime too, also I rally want to be a better developer.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-2 ">
                <h4 className='col-start-2 text-center border-solid border-2 border-indigo-600 rounded-full'>My skills <br></br>
                    <ul>
                        <li>Java</li>
                        <li>C++</li>
                        <li>JavaScript</li>
                        <li>CSS</li>
                        <li>HTML</li>
                    </ul>
                </h4>


            </div>

            <div className="grid grid-cols-3 gap-2 ">
            <h4 className='col-start-2 text-center border-solid border-2 border-indigo-600 rounded-br-lg rounded-bl-lg'>My Social Links: <br></br>
            <p><a href="https://www.linkedin.com/in/jiaming-zhao-3980b4235/" target="_blank" rel="noreferrer">LinkedIn</a></p>
            <p><a href="https://github.com/AkiZhao614" target="_blank" rel="noreferrer">GitHub</a></p>
            </h4>
            
            </div>

            
        </div>
    );
};
