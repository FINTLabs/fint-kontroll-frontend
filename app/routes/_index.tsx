import illustration from "/illustrasjon.svg"

export default function Index() {

    return (
        <main className={"WelcomeSection"}>
            <h1>
                Velkommen til FINT-Kontroll!
            </h1>
            <img src={illustration} alt={"illustrasjon"} style={{height: '6em', width: '6em'}}/>
        </main>
    )
}