const employees = [
    {name: 'brad', age: 23, id: 123, checked: false},
    {name: 'alisa', age: 54, id: 1234, checked: false},
    {name: 'ivan', age: 72, id: 12345, checked: false}
]

const tbody = document.querySelector('#tbody')

employees.forEach(item => {
    tbody.innerHTML += `
    <tr>
        <td><input type='checkbox' id='${item.id}'></td>
        <td>${item.name}</td>
        <td>${item.age}</td>
    </tr>`
})

tbody.addEventListener('click', (event)=>{
    if(event.target.tagName === 'INPUT'){
        const checkboxId = event.target.id
        const newEmployees = employees.map(item => {
            if(item.id === +checkboxId){
                item.checked = !item.checked
            }
            return item
        })


        const EmployeesX = newEmployees.filter(item => !item.checked)      // EmployeesX - оставшиеся сотрудники после увольнения. Эту строку в кнопку

        console.log(EmployeesX)
    }
})