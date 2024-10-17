import { CiEdit } from "react-icons/ci"

const Personal = () => {
    return (
        <>

            <div className="flex flex-col text-sky-950">
                <h1 className="font-bold text-2xl">Dados da minha conta</h1>
                <p className="text-gray-500">Alterações no e-mail, senha e telefone impactam seu acesso à plataforma.</p>
            </div>

            <div className="flex flex-col w-full justify-start gap-4 ">

                <h2 className="font-bold text-gray-500">Dados pessoais</h2>

                <div className="flex">
                    <div className="flex flex-col w-full">
                        <h1>Name</h1>
                        <div className="flex gap-1 items-center ">
                            <input type="text" placeholder="name" disabled className="w-full p-2 border bg-white rounded-full"></input>
                            <CiEdit size={28} />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <h1>Email</h1>
                        <div className="flex gap-1 items-center ">
                            <input type="text" placeholder="email" disabled className="w-full p-2 border bg-white rounded-full"></input>
                            <CiEdit size={28} />
                        </div>
                    </div>
                </div>

                <div className="flex">

                    <div className="flex flex-col w-full">
                        <h1>Telefone</h1>
                        <div className="flex gap-1 items-center ">
                            <input type="phone" placeholder="telefone" className="w-full p-2 border bg-white rounded-full"></input>
                            <CiEdit size={28} />
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <h1>Senha</h1>
                        <div className="flex gap-1 items-center ">
                            <input type="password" placeholder="telefone" className="w-full p-2 border bg-white rounded-full"></input>
                            <CiEdit size={28} />
                        </div>
                    </div>

                </div>

                <div className="flex gap-4">
                    <button className="border rounded-full  w-[6rem] py-2">cancelar</button>
                    <button className="bg-sky-950 rounded-full text-white w-[6rem] py-2">salvar</button>
                </div>

                <div className="border-t my-5 "></div>

                {/* Dados da entrega */}

                <h2 className="font-bold text-gray-500">Dados da entrega</h2>

                <div className="flex">
                    <div className="flex flex-col w-full">
                        <h1>CEP</h1>
                        <div className="flex gap-1 items-center ">
                            <input type="number" placeholder="telefone" className="w-full p-2 border bg-white rounded-full"></input>
                            <CiEdit size={28} />
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <h1>Cidade</h1>
                        <div className="flex gap-1 items-center ">
                            <input type="Text" placeholder="telefone" className="w-full p-2 border bg-white rounded-full"></input>
                            <CiEdit size={28} />
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <h1>UF</h1>
                        <div className="flex gap-1 items-center ">
                            <input type="password" placeholder="telefone" className="w-full p-2 border bg-white rounded-full"></input>
                            <CiEdit size={28} />
                        </div>
                    </div>

                </div>

                <div className="flex">
                    <div className="flex flex-col w-full">
                        <h1>Rua</h1>
                        <div className="flex gap-1 items-center ">
                            <input type="text" placeholder="telefone" className="w-full p-2 border bg-white rounded-full"></input>
                            <CiEdit size={28} />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <h1>Número</h1>
                        <div className="flex gap-1 items-center ">
                            <input type="number" placeholder="telefone" className="w-full p-2 border bg-white rounded-full"></input>
                            <CiEdit size={28} />
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <h1>Bairro</h1>
                        <div className="flex gap-1 items-center ">
                            <input type="text" placeholder="telefone" className="w-full p-2 border bg-white rounded-full"></input>
                            <CiEdit size={28} />
                        </div>
                    </div>


                </div>

                <div className="flex">
                    <div className="flex flex-col w-full">
                        <h1>Complemento</h1>
                        <div className="flex gap-1 items-center ">
                            <input type="text" placeholder="telefone" className="w-full p-2 border bg-white rounded-full"></input>
                            <CiEdit size={28} />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button className="border rounded-full  w-[6rem] py-2">cancelar</button>
                    <button className="bg-sky-950 rounded-full text-white w-[6rem] py-2">salvar</button>
                </div>

            </div>

        </>

    )
}

export default Personal