import { useLocation } from "react-router-dom";

// buscar como obtener el objeto directamente desde filmList

export const Serie = () => {
    const location = useLocation();
    // console.log(location)

    return (
        <p>
            Esto es una serie: {location.state.item.title}
        </p>
    );
}
