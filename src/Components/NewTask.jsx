import '../Styles/NewTask.css'
export function NewTask () {


    return(
        <div className="background-NewTask">

            <form className="NewTask-Form"action="">
                <input className="input-field-NewTask" type="text" placeholder='I want to'/>
                <input className="input-field-NewTask" type="text"  placeholder='create'/>
                <input className="input-field-NewTask" type="text" placeholder='a new Exercise'/>
                <input className="input-field-NewTask" type="text" placeholder='Learning'/>
                <input className="input-field-NewTask" type="text" placeholder='Ich will eine neue Aufgabe erstellen'/>
                <input className="input-field-NewTask" type="text" placeholder='Es bedeutet erstellen auf Deutsch'/>
                <input className="CreateNewTask"type="submit" value="Create" />
            </form>

        </div>
    )
}