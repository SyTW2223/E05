/* eslint-disable react/jsx-no-undef */
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBContainer, MDBTableBody } from 'mdb-react-ui-kit';
import { searchItemsNav } from '../../services/seacrhItemsNav';


export const SearchList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [films, setFilms] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        searchItemsNav(location.state.item).then(result => {
            setBooks(result.books);
            setFilms(result.films);
            setSeries(result.series);
        });
    }, [location.state.item]);
    

    return (
        <MDBContainer>
                <div className='welcome'>
                <h1 className="text-center my-5">Elementos encontrados</h1>
                </div>
                <MDBTable align='middle' bordered responsive className='caption-top'>
                    <MDBTableHead>
                        <tr className='table-secondary'>
                            <th scope='col'>Título</th>
                            <th scope='col'>Tipo</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                    {
                        books && books.map(book => {
                            return (
                                <tr key={book._id}>
                                    <td onClick={() => {navigate("/book/", {state: {item: book}})}}>{book.title}</td>
                                    <td>Book</td>
                                </tr>
                            )
                        })
                    }
                    {
                        films && films.map(film => {
                            return (
                                <tr key={film._id}>
                                    <td onClick={() => {navigate("/film/", {state: {item: film}})}}>{film.title}</td>
                                    <td>Film</td>
                                </tr>
                            )
                        })
                    }
                    {
                        series && series.map(serie => {
                            return (
                                <tr key={serie._id}>
                                    <td onClick={() => {navigate("/serie/", {state: {item: serie}})}}>{serie.title}</td>
                                    <td>Serie</td>
                                </tr>
                            )
                        })
                    }
                        
                    </MDBTableBody>
                </MDBTable>
        </MDBContainer>
    );
}
