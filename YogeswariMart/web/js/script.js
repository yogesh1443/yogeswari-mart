fetch("http://localhost:5000/api/products")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });

    let selectedRating = 0;

