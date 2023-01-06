import { useLocation } from "react-router-dom";

// buscar como obtener el objeto directamente desde filmList

export const Book = () => {
    const location = useLocation();
    // console.log(location)

    return (
        <p>
            Esto es un libro: {location.state.item.title}
        </p>
    );
}
