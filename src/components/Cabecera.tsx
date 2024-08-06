import React from "react";
import '../theme/styles.css'

interface Props {
    titulo: string;
}

export const Cabecera = ({ titulo }: Props) => {
    return (
        <div className="container-cabecera">
            <img src="" alt="" />
            <h2>{titulo}</h2>
        </div>
    )
}