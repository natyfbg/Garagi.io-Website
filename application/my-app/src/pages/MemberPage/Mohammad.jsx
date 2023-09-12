import mohammadImage from "../../images/Mohammad.png"
export default function Mohammad() {
    return (
        <div className='grid grid-cols-1 gap-2'>
            <div className='flex justify-center'><img src={mohammadImage} alt="Mohammad" width="300" /></div>


            <div className="grid grid-cols-5 gap-2 font-mono text-2xl text-red-500">
                <h3 className='col-start-3 text-center'>Mohammad Alhabli</h3>

            </div>

            <div className="grid grid-cols-3 gap-2">
                <p className="col-start-2 text-center border-solid border-2 border-black rounded-tl-lg rounded-tr-lg">
                    Hiya dudes!
                    I'm an aspiring full-stack web developer that is intending on finding work after graduating in the fall. I'm currently working as a freelance web developer
                    with a speciality in NFT minting websites. My hobbies include off-roading, travelling, and trying out new sports! I'm also passionate about activism for social causes
                    and advocating for my home country, Palestine 🇵🇸.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-2 ">
                <h4 className='col-start-2 text-center border-solid border-2 border-indigo-600 rounded-full'>My skills: <br></br>
                    <ul>
                        <li>Java</li>
                        <li>Python</li>
                        <li>Javascript</li>
                        <li>HTML/CSS</li>
                        <li>React.js</li>
                    </ul>
                </h4>


            </div>

            <div className="grid grid-cols-3 gap-2 ">
                <h4 className='col-start-2 text-center border-solid border-2 border-black rounded-br-lg rounded-bl-lg'>My Social Links: <br></br>
                    <p><a href="https://www.linkedin.com/in/mohammad-a-900abb18b/" target="_blank" rel="noreferrer">LinkedIn</a></p>
                    <p><a href="https://github.com/MohammadA98" target="_blank" rel="noreferrer">GitHub</a></p>
                </h4>

            </div>


        </div>
    );
};


