'use client'
import { useUser } from "@/app/context/userContext"
import Link from "next/link"
import { FormEvent, useState } from "react"
import { BiRightArrowAlt } from "react-icons/bi"

export interface Address {
    street: string,
    neighborhood: string,
    number: string,
    complement?: string,
    postalCode: string,
    city: string,
    state: string,
}

const initialAdress = {
    street: "",
    neighborhood: "",
    number: "",
    complement: "",
    postalCode: "",
    city: "",
    state: "",
}

const RegistrationPage = () => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmationPassword, setConfirmationPassword] = useState("")
    const [birthDate, setBirthDate] = useState<string>("")
    const [address, setAddress] = useState<Address>(initialAdress)
    const { registration , error } = useUser()

    const submitRegistration = (event: FormEvent) => {
        event?.preventDefault()
        const user = 
        {
            user: {
                name: name,
                email: email,
                password: password,
                birthDate: birthDate,
                address: {
                  street: address.street,
                  neighborhood: address.neighborhood,
                  number: address.number,
                  complement: address.complement,
                  postalCode: address.postalCode,
                  city: address.city,
                  state: address.state
                }
            }

        }
        registration({user})
    }
    const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    
    return (
        <div className="flex flex-col justify-between pt-10 items-center h-[calc(100vh-128px)] w-full gap-10">
            <form className="flex flex-col justify-center items-center gap-4  w-full lg:w-[50%]" onSubmit={(event) => submitRegistration(event)}>
                <h1 className="text-2xl">Registration</h1>
                <h2>Personal data</h2>
                <div className="flex w-full gap-4">
                    <input value={name} onChange={(event) => setName(event?.target.value)} placeholder="name" className="border border-1 w-full h-10 "></input>
                    <input value={email} onChange={(event) => setEmail(event?.target.value)} placeholder="email" className="border border-1 w-full h-10"></input>
                    <input type="date" value={birthDate} onChange={(event) => setBirthDate(event?.target.value)} className="border border-1 w-full h-10 text-gray-400"></input>
                </div>

                <div className="flex w-full gap-4">
                    <input value={password} onChange={(event) => setPassword(event?.target.value)} placeholder="password" className="border border-1 w-full h-10"></input>
                    <input value={confirmationPassword} onChange={(event) => setConfirmationPassword(event?.target.value)} placeholder="password" className="border border-1 w-full h-10"></input>
                </div>

                <h2>Addess</h2>
                <div className="flex w-full gap-4">
                    <input value={address.postalCode} onChange={handleChangeAddress} name="postalCode" placeholder="postal code" className="border border-1 w-full h-10"></input>
                    <input value={address.state} onChange={handleChangeAddress} name="state" placeholder="state" className="border border-1 w-full h-10"></input>
                </div>
                <div className="flex w-full gap-4">
                    <input value={address.city} onChange={handleChangeAddress} name="city" placeholder="city" className="border border-1 w-full h-10"></input>
                    <input value={address.neighborhood} onChange={handleChangeAddress} name="neighborhood" placeholder="neighborhood " className="border border-1 w-full h-10"></input>
                </div>
                <div className="flex w-full gap-4">
                    <input value={address.street} onChange={handleChangeAddress} name="street" placeholder="street" className="border border-1 w-full h-10"></input>
                    <input value={address.number} onChange={handleChangeAddress} name="number" placeholder="number" className="border border-1 w-full h-10"></input>
                    <input value={address.complement} onChange={handleChangeAddress} name="complement" placeholder="complement" className="border border-1 w-full h-10"></input>
                </div>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button className="bg-black w-40 h-10 text-white m-2" type="submit">sign up</button>
            </form>
            <div className="flex w-full items-center gap-2 justify-center">
                <Link href={"/users/login"}>I'm already a customer</Link>
                <BiRightArrowAlt />
            </div>
        </div>
    )
}

export default RegistrationPage