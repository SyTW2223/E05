import Item from "../services/item.services";

export async function searchItemsNav (title)
{
    const promesaBooks = Item.getItem("book/",  title);
    const promesaFilms = Item.getItem("film/",  title);
    const promesaSeries = Item.getItem("serie/",  title);

    let books = await promesaBooks;
    let films = await promesaFilms;
    let series = await promesaSeries;

    return {
        'books': books.data,
        'films': films.data,
        'series': series.data
    }


}