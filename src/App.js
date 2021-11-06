import React from 'react';
import './App.css';
import MaterialTable from 'material-table'


function App() {
  const columns = [
    { title: "Id", field: "_id" },
    { title: "City", field: "city" },
    { title: "Location", field: "loc" },
    { title: "Population", field: "pop" },
    { title: "State", field: 'state' }
  ]

  return (
    <div className="App">
      <h1 align="center">FiPaSeSo App</h1>
      <h4 align='center'>Filter, Pagination, Search, Sort  </h4>
      <MaterialTable
        title="City Data"
        columns={columns}
        options={{ debounceInterval: 700, padding: "dense", filtering: true }}
        data={query =>
          new Promise((resolve, reject) => {
            // prepare your data and then call resolve like this:
            let url = 'http://172.18.0.54:3000/location?'
            //searching
            if (query.search) {
              url += `q=${query.search}`
            }
            //sorting 
            if (query.orderBy) {
              url += `&_sort=${query.orderBy.field}&_order=${query.orderDirection}`
            }
            //filtering
            if (query.filters.length) {
              const filter = query.filters.map(filter => {
                return `&${filter.column.field}${filter.operator}${filter.value}`
              })
              url += filter.join('')
            }
            //pagination
            url += `&_page=${query.page + 1}`
            url += `&_limit=${query.pageSize}`

            fetch(url).then(resp => resp.json()).then(resp => {
              resolve({
                data: resp,// your data array
                page: query.page,// current page number
                totalCount: 499// total row number
              });
            })

          })
        }
      />
    </div>
  );
}

export default App;