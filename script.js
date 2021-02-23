let notes = []

// check for data held in local storage
const notesJSON = localStorage.getItem('notes')

if (notesJSON !== null){
    notes = JSON.parse(notesJSON)
}

// set up filters

const filters = {
    searchText: '',
}

// renderNotes based on searches
    // generateNoteDOM

const renderNotes = function (arrayToBeSearched, filterArray){
    // dynamically filter notes
    const filteredNotes = arrayToBeSearched.filter(function(item){
        return item.title.toLowerCase().includes(filterArray.searchText.toLowerCase())
    })

    // clear contents of DIV

    document.querySelector('#noteDiv').innerHTML = ''


    // generate DOM for each note


    filteredNotes.forEach(function(item){

        // create all elements 
        const noteEl = document.createElement('div')
        const button = document.createElement('button')
        const textEl = document.createElement('span')

        // set up remove button

        // removeNote function 
        
        const removeNote = function(id){
        const noteIndex = notes.findIndex(function(item){
            return item.id === id
             })

        if (noteIndex > -1){

            notes.splice[noteIndex, 1]
            }}

        button.textContent = 'x'
        noteEl.appendChild(button)
        button.addEventListener('click', function(){
            removeNote(item.id)
            localStorage.setItem('notes', JSON.stringify(notes))
            renderNotes (notes, filters) // wny am i calling this function within the function!?
        })
        

        // set up note title text

        if (item.title.length > 0 ){
            textEl.textContent = item.title
        } else {
            textEl.textContent = 'This is an unnamed note'
        }

        noteEl.appendChild(textEl)



        // append complete NoteEl to noteDiv // 
        document.querySelector('#noteDiv').appendChild(noteEl)

    })

}


renderNotes (notes, filters)


// eventListener to update filters on each input

document.querySelector('#search-text').addEventListener('input', function(e){
    filters.searchText = e.target.value
    renderNotes (notes, filters)
})

// push empty object onto array when 'create note' is clicked

document.querySelector('#create-note').addEventListener('click', function(){
    notes.push({
        id: uuidv4(),
        title: '',
        text: ''
    })
    // update localStorage
    localStorage.setItem('notes', JSON.stringify(notes))
    // rerender list
    renderNotes (notes, filters)
})
