import Link from 'next/link';

import { FaWhatsapp } from "react-icons/fa";

const WhatsappButtton = () => {
    const phoneNumber = '+4407506592977';

    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Link
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 md:w-20 md:h-20 bg-green-500 text-white bg rounded-full shadow-lg hover:bg-green-600 transition duration-300"
        >
          <FaWhatsapp size={32} />
        </Link>
      </div>
    )
}
export default WhatsappButtton