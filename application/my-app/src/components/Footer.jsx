export default function Footer() {
    return (
        <footer
            className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-white z-10">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022
            <a href="https://flowbite.com/"
               className="hover:underline"> Garage.io™
            </a>
            . All Rights Reserved.
        </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="about-us" className="mr-4 hover:underline md:mr-6 ">About Us</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/pr0m3th3us" className="hover:underline">Contact</a>
                </li>
            </ul>
        </footer>
    )}
