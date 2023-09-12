import profileImage from "../../images/Young.jpeg"

export default function Young() {
    return (
        <div className='grid grid-cols-1 gap-2'>
            <div className='flex justify-center'><img src={profileImage} alt="Young" width="300" /></div>


            <div className="grid grid-cols-5 gap-2 font-mono text-2xl text-cyan-900">
                <h3 className='col-start-3 text-center'>Young So</h3>

            </div>

            <div className="grid grid-cols-3 gap-2">
                <p className="col-start-2 text-center border-solid border-2 border-black rounded-tl-lg rounded-tr-lg">
                    Hey,
                    <br></br>
                    My name's Young and I'm an aspiring data scientist, hoping to work in a field where I would be able to work with
                    machine learning models. My hobbies include creating EDM/R&B music and skating.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-2 ">
                <h4 className='col-start-2 text-center border-solid border-2 border-indigo-600 rounded-full'>My skills: <br></br>
                    <ul>
                        <li>Java</li>
                        <li>Python</li>
                        <li>Javascript</li>
                        <li>HTML/CSS</li>
                        <li>C++</li>
                        <li>.NET</li>
                        <li>XML</li>

                    </ul>
                </h4>


            </div>

            <div className="grid grid-cols-3 gap-2 ">
                <h4 className='col-start-2 text-center border-solid border-2 border-black rounded-br-lg rounded-bl-lg'>My Social Links: <br></br>
                    <p><a href="https://www.linkedin.com/in/young-so-273827132/" target="_blank" rel="noreferrer">LinkedIn</a></p>
                    <p><a href="https://github.com/xynrgys" target="_blank" rel="noreferrer">GitHub</a></p>
                </h4>

            </div>


        </div>
    );
};
