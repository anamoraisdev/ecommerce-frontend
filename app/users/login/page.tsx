'use client';
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { BiRightArrowAlt } from "react-icons/bi";


const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { login, error, user } = useUser();

    const submitLogin = async (event: FormEvent) => {
        event?.preventDefault()
        const response = await login(email, password);
        if (response) {
            console.log(response)
            setTimeout(() => {
                window.location.href = 'http://localhost:3000/';
            }, 1000);
        } else {
            console.log("error", error)
        }
    }

    useEffect(() => {
        console.log("user", user)
        if (user) {
            window.location.href = 'http://localhost:3000/';
        }
    }, [user]);

    return (
        <div className="flex flex-col justify-between pt-20 items-center h-[calc(100vh-128px)] w-full">
            <div className="flex flex-col items-center gap-4">
                <form className="flex flex-col w-full justify-center items-center gap-4" onSubmit={(event) => submitLogin(event)}>
                    <h1 className="text-2xl">Sign in</h1>
                    <input value={email} onChange={(event) => setEmail(event?.target.value)} placeholder="email" className="border border-1 w-full h-10"></input>
                    <input value={password} onChange={(event) => setPassword(event?.target.value)} placeholder="password" className="border border-1 w-full h-10"></input>
                    <div className="flex items-center gap-10">
                        <Link href="#"><input type="checkbox"></input> Remember password</Link>
                        <Link href="#">Forgot password?</Link>
                    </div>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    <button className="bg-black w-40 h-10 text-white" type="submit">login</button>
                    <Link className="border border-1 p-2" href="http://localhost:4000/users/auth/google_oauth2">
                        login with google
                    </Link>
                </form>

            </div>
            <div className="flex w-full items-center gap-2 justify-center">
                <Link href={"/users/registration"}>Create your account</Link>
                <BiRightArrowAlt />
            </div>
        </div>
    )
}

export default Login;