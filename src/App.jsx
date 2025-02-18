import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PrimerComponente from "./PrimerComponente";
import SegundoComponente from "./SegundoComponente";
import TercerComponente from "./TercerComponente";

function App() {

    return(
        <div>
            <PrimerComponente/>
            <SegundoComponente/>
            <TercerComponente/>
        </div>

    )

}

export default App
