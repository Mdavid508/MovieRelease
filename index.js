//Movie class
class Movie{
    constructor(title,releaseDate,link){
        this.title = title;
        this.releaseDate = releaseDate;
        this.link = link;

    }

}

//UI class: Handle UI Tasks
// will have methods
class UI{
    static displayMovie(){
      const movies = Store.getMovies();

        //looping through the list
        movies.forEach((movie)=>UI.addMovieToList(movie));

    }

    static addMovieToList(movie){
        const list = document.getElementById("movie-list");

        //create a row where the table data will be displayed
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${movie.title}</td>
        <td>${movie.releaseDate}</td>
        <td><a href = "${movie.link}" target = "blank">Link</a></td>
        <td class ="btn btn-danger btn-sm delete">X</td>
        `;
        //Appending the values to the table row
        list.appendChild(row);

    }
    static clearFields(){
        document.getElementById('movie-name').value = " ";
        document.getElementById('release-date').value = " ";
        document.getElementById('trailer-link').value = " ";

    }

    //method to facilitate the deletion of element
    static deleteMovie(el){
        if(el.classList.contains('delete')){
            el.parentElement.remove();
        }
    }
    //method to show alerts using Javascript
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = ` text-center alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector("#movie-form");
        container.insertBefore(div,form);

        //vanish in 3.0 secs
        setTimeout(()=> document.querySelector('.alert').remove(),4000);




    }
}

//Store Class: Handle the storing by adding them to the local storage
//Deleting movies from the local storage
 //this means the local storage.
class Store{
    //get movie method
    static getMovies(){
        let movies;
        if(localStorage.getItem('movies') === null){
          movies = [];  //if the movies list is empty create an array.
        }else{
            movies = JSON.parse(localStorage.getItem('movies')); //else if it is not empty you return the values in the local storage 
                                                                //in this case only the value excluding the key
        }
        return movies;
    }

    //Add movie method
    static addMovie(movie){
        const movies = Store.getMovies();

        movies.push(movie);

        localStorage.setItem('movies', JSON.stringify(movies));

    }

    //removemovie method
    static removeMovie(title){
        const movies = Store.getMovies();
        movies.forEach((movie, index)=>{
            if(movie.title === title){
                movies.splice(index, 1);

            }
        });

        localStorage.setItem('movies', JSON.stringify(movies));
    }
}

//Event : Display Movies
document.addEventListener("DOMContentLoaded", UI.displayMovie);
//Event : Add a Movie.
document.getElementById('movie-form').addEventListener('submit', (e)=>{
    //prevent default value of the form
    e.preventDefault();
    //get the form values.
    const title = document.getElementById('movie-name').value;
    const releaseDate = new Date(document.getElementById('release-date').value).toDateString();
    const link = document.getElementById('trailer-link').value

    // validation 
    if(title=== '' || releaseDate=== '' || link === ''){
        UI.showAlert("Please Enter the Necessary Details","danger"); 
    }else{
        UI.showAlert("Movie Details Added Successfully", "success");
    //instantiate a new movie
    const movie = new Movie(title,releaseDate,link);
    //add movie to UI   
    UI.addMovieToList(movie);

    //add movies to the store
    Store.addMovie(movie);
    //clear fields
    UI.clearFields();


    }

})

//Event : Remove a movie from list.
//selecting the exact element that has to be clicked for deletion to happen
document.getElementById('movie-list').addEventListener('click', (e)=>{
    //remove movie from UI
    UI.deleteMovie(e.target);

    //remove movie from Store
    Store.removeMovie(e.target.parentElement.firstElementChild.textContent);
    console.log(e.target.parentElement.firstElementChild.textContent);
    
    //show success message
    UI.showAlert("Book Removed successfully", 'success');

})


