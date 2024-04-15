const Navbar = () => {
    return (
        <main className="bg-primary w-full h-32 fixed-top flex items-center justify-between" >
            <h1 className="text-white mx-10">LOGOSTORE</h1>
            <section className="flex gap-4 px-10">
                <a href='' className="text-white hover:text-slate-200">
                    Blusas
                </a>
                <a href='' className="text-white hover:text-slate-200">
                    Calcas
                </a>
                <a href='' className="text-white hover:text-slate-200">
                    Vestidos
                </a>
                <a href='' className="text-white hover:text-slate-200">
                    Casacos
                </a>
                <a href='' className="text-white hover:text-slate-200">
                    Fale conosco
                </a>
            </section>
        </main>
    )
}

export default Navbar;