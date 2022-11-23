document.getElementById("add-btn").addEventListener("click",function(){

    let categories=document.getElementById("categories").value;
    
    fetch(" http://localhost:3000/categories",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            category:categories
        })
    }).then(function() {
        alert("Success");
    })
});

function renderCategories() {
    fetch("http://localhost:3000/categories", {
        method:"GET"
    })
    .then(function(data) {
        return data.json();
    })
    .then(function(categories){
        console.log(categories)
        document.getElementById("tBody").innerHTML="";
        for (let category of categories){
            const tableRow = document.createElement("tr");

            const tdId = document.createElement("td");
            tdId.textContent = category.id;
            const tdCategory = document.createElement("td");
            tdCategory.textContent = category.category;
            const tdDelete = document.createElement("td");
            const tdDeleteLink = document.createElement("a");
            tdDeleteLink.textContent = "Delete";
            tdDeleteLink.href = "https://google.com";
            tdDeleteLink.classList.add("delete");
            tdDeleteLink.setAttribute("data-categoryid", category.id);
            
            tdDelete.appendChild(tdDeleteLink);

            tableRow.appendChild(tdId);
            tableRow.appendChild(tdCategory);
            tableRow.appendChild(tdDelete);
            document.getElementById("tBody").appendChild(tableRow);
        }
       
        const deleteLinks = document.getElementsByClassName("delete");
        

        for(let deleteLink of deleteLinks) {
            deleteLink.addEventListener("click", function(event){
                event.preventDefault();

                console.log(event);

                const id = event.target.getAttribute("data-categoryid");

                fetch("http://localhost:3000/categories/" + id, {
                    method: "DELETE"
                })
                .then(function(){
                    alert("Category deleted!!");

                    // refresh table of candidates!!
                    renderCategories();

                })
            })
        }
    })    
}




window.onload = function() {
    renderCategories();
}