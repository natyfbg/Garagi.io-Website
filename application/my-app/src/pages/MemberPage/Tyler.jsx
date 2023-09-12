import TylerImage from '../../images/Tyler.jpg';

export default function Tyler(){
    return (
        <div className='grid grid-cols-1 gap-2'>
            <div className='flex justify-center'><img src={TylerImage} alt="Tyler" width="300" /></div>


            <div className="grid grid-cols-5 gap-2 font-mono text-2xl text-cyan-900">
                <h3 className='col-start-3 text-center'>Tyler Fulinara</h3>

            </div>

            <div className="grid grid-cols-3 gap-2">
                <p className="col-start-2 text-center border-solid border-2 border-black rounded-tl-lg rounded-tr-lg">
                    Hi everyone,
                    <br></br>
                    I am currently a full-time student here at San Francisco State University. I am aspiring to
                    be a full-stack software engineer. I hope to have create my own tech company after gaining time and experience
                    from being in the tech industry. My hobbies include video games, traveling, and sports.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-2 ">
                <h4 className='col-start-2 text-center border-solid border-2 border-indigo-600 rounded-full'>My skills: <br></br>
                    <ul>
                        <li>C++</li>
                        <li>Java</li>
                        <li>Javascript</li>
                        <li>HTML / CSS</li>
                        <li>C#</li>

                    </ul>
                </h4>


            </div>

            <div className="grid grid-cols-3 gap-2 ">
                <h4 className='col-start-2 text-center border-solid border-2 border-black rounded-br-lg rounded-bl-lg'>My Social Links: <br></br>
                    <p><a href="https://www.linkedin.com/in/tyler-fulinara-76523815b" target="_blank" rel="noreferrer">LinkedIn</a></p>
                    <p><a href="https://github.com/TylerFulinara" target="_blank" rel="noreferrer">GitHub</a></p>
                </h4>

            </div>
        </div>
    );
};
