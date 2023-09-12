
import JoeImage from '../../images/Joe.jpeg';

export default function Joe() {
    return (
        <div className='grid grid-cols-1 gap-2'>
            <div className='flex justify-center'><img src={JoeImage} alt="Joe" width="300" /></div>

            
            <div className="grid grid-cols-5 gap-2 font-mono text-2xl text-pink-800">
                <h3 className='col-start-3 text-center'>Joe Sand</h3>

            </div>

            <div className="grid grid-cols-3 gap-2">
                <p className="col-start-2 text-center border-solid border-2 border-black rounded-tl-lg rounded-tr-lg">
                    Hello!

                    This is my 4th year at SFSU and I hope to be graduatating soon. I am pursuing
                    a career in software engineering. I am excited to learn as much as possible in
                    this course. In my free time I enjoy reading and playing videogames.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-2 ">
                <h4 className='col-start-2 text-center border-solid border-2 border-indigo-600 rounded-full'>My skills <br></br>
                    <ul>
                        <li>Java</li>
                        <li>C / C++</li>
                        <li>Python</li>
                        <li>html / Javascript</li>
                    </ul>
                </h4>


            </div>

            <div className="grid grid-cols-3 gap-2 ">
                <h4 className='col-start-2 text-center border-solid border-2 border-black rounded-br-lg rounded-bl-lg'>My Social Links: <br></br>
                    <p><a href="https://www.linkedin.com/in/joe-sand-58721724b/" target="_blank" rel="noreferrer">LinkedIn</a></p>
                    <p><a href="https://github.com/j0es4nd" target="_blank" rel="noreferrer">GitHub</a></p>
                </h4>

            </div>


        </div>
    );
};
