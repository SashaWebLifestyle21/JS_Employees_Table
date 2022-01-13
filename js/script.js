const addButton = document.getElementById('addButton')
const sumButton = document.getElementById('sumButton')
const countButton = document.getElementById('countButton')
const deleteButton = document.getElementById('deleteButton')
const sortYearBtn = document.getElementById('sortYear')
const sortDateBtn = document.getElementById('sortDate')
const table = document.getElementById('table')
const tbody = document.getElementById('tbody')
const SURNAME = document.getElementById('surname')
const YEAR = document.getElementById('year')
const RECRUITMENT = document.getElementById('recruitment')
const SALARY = document.getElementById('salary')

const employeesArr = []


const numberEmployee = (array) => {
    document.getElementById('countEmpl').textContent = array.length
}
const drawTable = () => {
    tbody.innerHTML = ''
    let array = JSON.parse(localStorage.getItem('person'))
    array.forEach(item => {
        tbody.innerHTML += `
        <tr>
        <td><input type='checkbox' id='${item.id}'></td>
        <td>${item.name}</td>
        <td>${item.year}</td>
        <td>${item.recruitment}</td>
        <td>${item.salary}</td>
        </tr>`
    });
    numberEmployee(array)
}
if(localStorage.person){
    drawTable()
}


const deleteEmployees = () =>{
    let deleteEmployeesArr = JSON.parse(localStorage.getItem('person'))
    let newDeleteArr = deleteEmployeesArr.filter(item => !item.checked)
    localStorage.setItem('person', JSON.stringify(newDeleteArr))
    console.log(newDeleteArr)
    drawTable()
}

const sumSalaryEmployee = () => {
    let sum = 0
    let sumEmployeesArr = JSON.parse(localStorage.getItem('person'))
    let newSumArr = sumEmployeesArr.filter(item => item.checked)
    newSumArr.forEach(item => {
        sum += +item.salary
    })
    document.getElementById('sumEmpl').textContent = sum
}

addButton.addEventListener('click', (event) => {
    event.preventDefault();
    if(SURNAME.value === '' || YEAR.value === '' || RECRUITMENT.value === '' || SALARY.value === ''){
        alert('Заполните все поля')
    }
    else{
        let surname = SURNAME.value
        let year = YEAR.value
        let recruitment = RECRUITMENT.value
        let salary = SALARY.value
        if(localStorage.person){
            let addEmployees = JSON.parse(localStorage.getItem('person'))
            addEmployees.push({name: surname, year: year, recruitment: recruitment, salary: salary,id: new Date().getTime(), checked: false})
            localStorage.setItem('person', JSON.stringify(addEmployees))
            drawTable()
            console.log(addEmployees)
        } else{
            let addNewEmployees = []
            addNewEmployees.push({name: surname, year: year, recruitment: recruitment, salary: salary,id: +(new Date().getTime()), checked: false})
            localStorage.setItem('person', JSON.stringify(addNewEmployees))
            console.log(addNewEmployees)
            drawTable()
        }
    }
    
})
const sortByYear = (arr) => {
    arr.sort((a, b) => a.year > b.year ? 1 : -1);
}
const sortYear = () => {
    let sortYearArr = JSON.parse(localStorage.getItem('person'))
    sortByYear(sortYearArr)
    localStorage.setItem('person', JSON.stringify(sortYearArr))
}
const sortByDate = (arr) => {
    arr.sort(function(a,b){
        return new Date(a.recruitment) - new Date(b.recruitment);
    });
}
const sortDate = () => {
    let sortDateArr = JSON.parse(localStorage.getItem('person'))
    sortByDate(sortDateArr)
    localStorage.setItem('person', JSON.stringify(sortDateArr))
}
tbody.addEventListener('click', (event)=>{
    
    if(event.target.tagName === 'INPUT'){
        const drawEmployees = JSON.parse(localStorage.getItem('person'))
        const checkboxId = event.target.id
        const newEmployees = drawEmployees.map(item => {
            if(item.id === +checkboxId){
                item.checked = !item.checked
            }
            return item
        })
        console.log(newEmployees)
        localStorage.setItem('person',  JSON.stringify(newEmployees))
    }
})

deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    deleteEmployees()
})

sumButton.addEventListener('click', (event) => {
    event.preventDefault();
    sumSalaryEmployee()
})
sortYearBtn.addEventListener('click', () => {
    sortYear()
    drawTable()
})
sortDateBtn.addEventListener('click', () => {
    sortDate()
    drawTable()
})