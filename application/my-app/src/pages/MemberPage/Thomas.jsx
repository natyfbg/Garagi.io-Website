import ThomasImage from '../../images/Thomas.png';

export default function Thomas(){
    return (
        <div className='grid grid-cols-1 gap-2'>
            <div className='flex justify-center'><img src={ThomasImage} alt="Thomas" width="300" /></div>


            <div className="grid grid-cols-5 gap-2 font-mono text-2xl text-cyan-900">
                <h3 className='col-start-3 text-center'>Thomas Michel</h3>

            </div>

            <div className="grid grid-cols-3 gap-2">
                <p className="col-start-2 text-center border-solid border-2 border-black rounded-tl-lg rounded-tr-lg">
                    What's up you all!
                    <br></br>
                    Currently in San Francisco for an international exchange, I am interested in Computer Sciences since I am 5 y.o.
                    <br></br>
                    Working as Full-Stack developer as a freelancer, I am now the co-founder of a French startup called Glowme !
                </p>
            </div>

            <div className="grid grid-cols-3 gap-2 ">
                <h4 className='col-start-2 text-center border-solid border-2 border-indigo-600 rounded-full'>My skills: <br></br>
                    <ul>
                        <li>Javascript / Typescript</li>
                        <li>C / C++</li>
                        <li>Rust</li>
                        <li>Python</li>
                        <li>Kotlin</li>
                        <li>Flutter</li>
                        <li>GraphQL</li>
                        <li>Docker</li>
                        <li>Haskell</li>
                    </ul>
                </h4>


            </div>

            <div className="grid grid-cols-3 gap-2 ">
                <h4 className='col-start-2 text-center border-solid border-2 border-black rounded-br-lg rounded-bl-lg'>My Social Links: <br></br>
                    <p><a href="https://www.linkedin.com/in/pr0m3th3us" target="_blank" rel="noreferrer">LinkedIn</a></p>
                    <p><a href="https://github.com/pr0m3th3usEx" target="_blank" rel="noreferrer">GitHub</a></p>
                </h4>

            </div>


        </div>
    );
};
