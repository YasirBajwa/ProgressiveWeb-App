

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });  
  }

  function getUser() {
var url='https://api.github.com/users/';
    fetch(url + user.value + '/followers')
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log('fetch data github');
        console.log('hello', result);
        displayFollowers(result)

      })
    caches.match(`https://api.github.com/users/${user.value}/followers`)
      .then(function (response) {
        if (!response) {
          console.log('No Data');
        }
        console.log('Cache Data');
        console.log(response);
      })
      .then(function (data) {
        console.log('data from cache = ', data)
      })
      .catch(function (err) {
        console.log('Error ', err)
      })

    }
    function displayFollowers(data) {

      if (data.length > 0) {
        var parent = document.getElementById('table');
  
        // var childTable = document.getElementById('userProfile');
        //console.log('children', parent.children.length);
        if (parent.children.length > 0) {
          console.log('children', parent.children);
          var childTable = document.getElementById('userProfile');
          parent.removeChild(childTable)
        }
        var table = document.createElement("table");
        table.id = 'userProfile';
        var tbody = document.createElement('tbody');
        table.className = 'table table-bordered';
  
  
        console.log(data)
        data.forEach(function (oneFollower) {
          var tr = document.createElement('tr');
          var td = document.createElement('td');
          var td1 = document.createElement('td');
          td.innerText = oneFollower.id;
          td1.innerText = oneFollower.login;
          // var secodChild = td.innerText=oneFollower.login
  
          tr.appendChild(td);
          tr.appendChild(td1);
          tbody.appendChild(tr);
          table.appendChild(tbody)
          document.getElementById('table').appendChild(table)
        })
      } else {
        var parent = document.getElementById('table');
        if (parent.children.length > 0) {
          // console.log('children', parent.children);
          var childTable = document.getElementById('userProfile');
  
          parent.removeChild(childTable)
  
          var h1 = document.createElement('h1');
  
          h1.innerText = 'No Record';
          h1.id = 'userProfile';
          document.getElementById('table').appendChild(h1)
        }
  
  
      }
    }