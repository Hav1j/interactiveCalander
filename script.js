//
var xhttp = new XMLHttpRequest();
//final results are saved in this array
let finalArray = [];
//an Array to manipulate data
var events = [];
//console.log(events) // TEST if elements are correctly pushed to events Array
const generalHolder = [];
//console.log(finalArray);//check if elements are correctly pushed to finalArray


//check status and generate 2 copies of the events
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const eventers = JSON.parse(xhttp.responseText)
        //const that keeps the values untouched
        for (var index in eventers) {
            events.push(eventers[index]);
            generalHolder.push(eventers[index]);
        }
        //loop through the "eventer" and push each item to lists above
        eventers.forEach(function (event) {

            //events.push(event);
            //console.log(events)

        });
        /* if the startDate and endDate are on the SAME DAY,
            we add the flag "continues" and assign it to FALSE,
            then, we push the event to our final array.

            OTHERWISE, send it through the function recunstruct,
            where it will be modified into an array - the events will 
            also be given the flag "continues" and the value
            assigned to TRUE.
         */

    }
    buildArray();
    display();



}

//get the JSON file
xhttp.open("GET", "data.json", true);
xhttp.send();

function buildArray() {
    events.forEach(function (event, i) {

        const times = {
            strt: getStartDate(event),
            end: getEndDate(event)
        }


        if (times.strt.getDay() == times.end.getDay()) {
            event.continues = false;
            finalArray.push(event);


        } else {
            var nt = reconstruct(event);
            finalArray.splice(i, 0, nt, )
        }

    });
}




function display() {
    var resultsObjToString = JSON.stringify(finalArray);
    const aF = finalArray;
    
    //loop through each item in the const Array made above.
    for (var i in finalArray){
        let i = 0; //initialize i 
        if (i < finalArray.length && i >= 0) { //as long as i is 0 or larger, and it is not larger than finalArray's length

            var responsiveSlider = function () { //initialize slider for each event
                //save the buttons in variables
                var prev = document.getElementById("prev");
                var next = document.getElementById("next");

                


                //when next is clicked increment i - then run the "pushIt()" function to 
                //push the data into the HTML tags.
                next.onclick = function () {

                    

                    //console.log("NEXT CLICKED"); //test if clicking works
                    
                    if(i>=0 && i<finalArray.length){

                        i++;
                        //TEST: check if i is incremented
                        console.log(i);
                        wrapIt();
                    
                }

                
                };
                //if prev is clicked, decrement i then run the "wrapIt()" function
                prev.onclick = function () {
                    //console.log("PREV CLICKED"); //TEST: check if clicking works
                    if(i>=1){
                    i--;
                    console.log(i); //TEST: check if i is decremented
                    wrapIt();
                    } 
                };

            }



            //shows the element of the list through binding together with given ID - pushing data to the HTML
            function wrapIt() {

                if(i==0)
                document.getElementById("prev").disabled = true;
                else
                document.getElementById("prev").disabled = false;

                

                if (i==finalArray.length-1)                 
                    document.getElementById('next').disabled = true;
                    else 
                    document.getElementById("next").disabled = false;


                if(i<finalArray.length){ 

                
                //if the element in the array is in itself an array, then format it right
                if (Array.isArray(finalArray[i])) {
                    document.getElementById("id").innerHTML =
                        JSON.stringify(finalArray[i][i]['id']);
                    document.getElementById("type").innerHTML =
                        JSON.stringify(finalArray[i][0]['activity']);
                    document.getElementById("location").innerHTML =
                        JSON.stringify(finalArray[i][0]['location']);
                    document.getElementById("start").innerHTML =
                        JSON.stringify(finalArray[i][0]['startDate']);
                    document.getElementById("end").innerHTML =
                        JSON.stringify(finalArray[i][1]['endDate']);

                }
                //if the element is not an array, then save each key to the list in HTML
                else {

                    document.getElementById("id").innerHTML =
                        JSON.stringify(finalArray[i]['id']);
                    document.getElementById("type").innerHTML =
                        JSON.stringify(finalArray[i]['activity']);
                    document.getElementById("location").innerHTML =
                        JSON.stringify(finalArray[i]['location']);
                    document.getElementById("start").innerHTML =
                        JSON.stringify(finalArray[i]['startDate']);
                    document.getElementById("end").innerHTML =
                        JSON.stringify(finalArray[i]['endDate']);
                }
            } else if (i==finalArray.length) {
                
                document.getElementById('next').disabled = true;
                console.log("i out of scope");
                i--;
                
            }  
            }


            responsiveSlider();
            wrapIt();
        }
    };
    // console.log(item); //TEST: see which item we are on
}


/*reconstruct() takes an event that stretches over more than 
one day, makes an Array with two copies of the event in it (parsedEvent1 
and parsedEvent2) - pE1's endDate is sent through nullify() 
in order to be corrected. the same goes for pE2's startDate.
The two variables then are put inside an Array and returned
as the output of the function
*/

function reconstruct(event) {
    this.event1 = event;
    this.event2 = event;

    //copying each problematic event into two different variables(events)
    var parsedEvent1 = JSON.parse(JSON.stringify(event));
    var parsedEvent2 = JSON.parse(JSON.stringify(event));
    //Save correct time in two different variables
    eventTimeStart = nullify(event1.startDate);
    eventTimeEnd = nullify(event2.endDate);
    parsedEvent1.endDate = eventTimeEnd;
    parsedEvent2.startDate = eventTimeStart;
    // adding a flag
    parsedEvent1.continues = true;
    parsedEvent2.continues = true;



    //UNCOMMENT the following for TESTing:
    /*
    console.log(event1);
    console.log(event2);
    console.log(parsedEvent1);
    console.log(parsedEvent2);
    */

    return [parsedEvent1, parsedEvent2];

}



//A function for getting startDate
function getStartDate(event) {
    this.e1 = event;
    this.stDate = new Date(event.startDate);
    return this.stDate;
}
//A function for getting endDate
function getEndDate(event) {
    this.e1 = event;
    this.eDate = new Date(event.endDate);
    return this.eDate;
}

//A function to correct time
function nullify(time) {
    this.time = time;
    var day = new Date(time).getDay();


    var output = time.replace(/..:../, "00:00");

    return output;
}
