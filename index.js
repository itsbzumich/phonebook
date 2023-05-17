const express = require('express')
const app = express()
app.use(express.json())
var morgan = require('morgan')
const cors = require('cors')

app.use(cors())

morgan.token('body', (request) =>
  request.method === 'POST' ? JSON.stringify(request.body) : null
);

app.use(
  morgan(':method :status :res[content-length] - :response-time ms :body')
  );

let persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
  
  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id===id)
    if(person){
        res.json(person)
    }
    else{
        res.status(404).end()
    }
  })

  app.get('/api/info', (req, res) => {
    const currentDate = new Date().toLocaleString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

        res.send(
            `
            <div>
                <p>Phonebook has info for ${persons.length} people</p>
            </div>
            <div>
                <p>${currentDate} (${timeZone})</p>
            </div>`
        )
    
  })

  app.post('/api/persons', (request, response) => {
    var idee = Math.floor(50*Math.random())
    const body = request.body
    console.log(body)
    if (!body.name||!body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    if(persons.find(person=> person.name===body.name)){
        return response.status(400).json({ 
            error: 'name must be unique' 
          })
    
    }
    var person = {
        id: idee,
        name : body.name,
        number : body.number
    }
    persons=persons.concat(person)
    response.json(person)
  })


  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id!==id)
        res.status(204).end()
    
  })



  const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})