document.getElementById("playerSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("playerInput").value;
  if (value === "")
    return;
  console.log(value);
  //  const url = `https://www.balldontlie.io/api/v1/season_averages?season=${value}&player_ids[]=${i}&player_ids[]=${i+1}&player_ids[]=${i+2}&player_ids[]=${i+3}&player_ids[]=${i+4}&player_ids[]=${i+5}`
  const url = `https://www.balldontlie.io/api/v1/players?search=${value}`
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = '<table class="table table-dark"><thead class="thead-dark"><tr><th scope="col">Name</th><th scope="col">Position</th><th scope="col">Height</th><th scope="col">Weight</th><th scope="col">Team</th><th scope="col">Conference</th></tr></thead><tbody>'
      for (let i = 0; i < json.data.length; i++){
        results +='<tr>'
        results += `<td>${json.data[i].first_name} ${json.data[i].last_name}</td>`
        if(json.data[i].position != " " && json.data[i].position != null && json.data[i].position != ""){
        results += `<td>${json.data[i].position} </td>`
        }
        else{
          results += "<td>Unknown</td>"
        }
        if(json.data[i].height_feet != null){
          results += `<td>${json.data[i].height_feet}'${json.data[i].height_inches}"</td>`
        }
        else{
          results += '<td>Unknown</td>'
        }
        if(json.data[i].weight_pounds != null){
          results += `<td>${json.data[i].weight_pounds} pounds</td>`
        }
        else{
          results += '<td>Unknown</td>'
        }
        results += `<td>${json.data[i].team.full_name}</td>`;
        results += `<td>${json.data[i].team.conference}</td></tr>`;
      }
      results += '</tbody></table>'
      document.getElementById("playerResults").innerHTML = results;
    })

});
