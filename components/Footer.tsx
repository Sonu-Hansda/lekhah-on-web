import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer(){
    return (
        <footer className="px-2 py-6 bg-black grid grid-cols-1 justify-center md:grid-cols-3 text-gray-400 text-sm">
        <div className="font-bold text-3xl text-center cursor-pointer">
          <p>लेखक
          <span className="text-blue-500">on</span>web
          </p>
          <span>Copyright © 2024</span>
        </div>
        <div className="col-span-2">
          
          <ul className="flex justify-center md:justify-normal items-center space-x-4 text-xs border-b pb-2">
            <li className='md:border-r md:pr-2'>Home </li>
            <li className='md:border-r md:pr-2'>Privacy & Policy </li>
            <li className='md:border-r md:pr-2'>Terms & Conditions </li>
            <li className="justify-self-end bg-blue-500 p-2 text-black">Contact Us</li>
          </ul>
            <ul className="flex justify-center md:justify-end space-x-2 text-lg pt-2">
              <li>
                <FaFacebook/>
              </li>
              <li>
                <FaXTwitter/>
              </li>
              <li>
                <FaInstagram/>
              </li>
            </ul>
          </div>  
        </footer>    
    );
}