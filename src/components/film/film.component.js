import { useLocation } from "react-router-dom";

// buscar como obtener el objeto directamente desde filmList

export const Film = () => {
    const location = useLocation();
    // console.log(location)

    return (
        <p>
            {location.state.item.title}
        </p>
    );
}
