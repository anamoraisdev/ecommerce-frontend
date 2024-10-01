import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { MdOutlineMarkEmailRead } from "react-icons/md";

const ConfirmationPage = () => {
    return (
        <div className="flex flex-col h-[calc(100vh-128px)] justify-center items-center">
            <MdOutlineMarkEmailRead size={60}/>
            <h1 className="text-2xl text-semibold">Seu email foi confirmado!</h1>
           <div className="flex items-center justify-center">
           <Link className="" href="/users/login"> Fazer login</Link>
                <BiRightArrowAlt />
            </div>
        </div>
    )
}

export default ConfirmationPage;