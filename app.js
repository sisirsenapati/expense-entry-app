const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwYfyRniY8lonIE6MN17GtrzjGrMjAF_dixD2Zg4BbTwt3I9LcdwRqqAIx9gobVZsiK/exec";

document
.getElementById("submitBtn")
.addEventListener("click", submitData);

async function submitData(){

    const amount =
        document.getElementById("amount").value;

    const upiName =
        document.getElementById("upiName").value;

    const purpose =
        document.getElementById("purpose").value;

    if(!amount || !upiName || !purpose){
        alert("Please fill all fields");
        return;
    }

    const payload = {

        amount: amount,
        upiName: upiName,
        purpose: purpose,

        upiId: "Cash",
        transactionRef: "Cash"

    };

    try{
        document.getElementById("loader").style.display = "block";
        document.getElementById("submitBtn").disabled = true;
        const response = await fetch(
            SCRIPT_URL,
            {
                method:"POST",
                mode: "no-cors",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                        amount: amount,
                        upiName: upiName,
                        purpose: purpose
                      })
            }
        );

        if(response.ok){

            document.getElementById("amount").value="";
            document.getElementById("upiName").value="";
            document.getElementById("purpose").value="";

            showToast(
                "Record Added Successfully"
            );
        }
        else{
            alert("Record Added Successfully");
        }
        document.getElementById("loader").style.display = "none";
        document.getElementById("submitBtn").disabled = false;
    }catch(error){

        console.error(error);
        alert("Error submitting record");
    }
}

function showToast(message){

    const toast =
        document.getElementById("toast");

    toast.innerText = message;

    toast.style.display = "block";

    setTimeout(()=>{
        toast.style.display = "none";
    },3000);
}
function startSpeech1(fieldId) {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if(!SpeechRecognition){

        alert(
            "Speech Recognition not supported"
        );

        return;
    }

    const recognition =
        new SpeechRecognition();

    recognition.lang = "en-IN";

    const micButton =
        document.getElementById(
            fieldId + "Mic"
        );

    const status =
        document.getElementById(
            fieldId + "Status"
        );

    recognition.onstart = () => {

        micButton.classList.add(
            "listening"
        );

        status.innerHTML = `
            <span class="dot"></span>
            Listening...
        `;
    };

    recognition.start();

    recognition.onresult = (event) => {

        const text =
            event.results[0][0].transcript;

        document.getElementById(
            fieldId
        ).value = text;
    };

    recognition.onend = () => {

        micButton.classList.remove(
            "listening"
        );

        status.innerHTML =
            "✓ Voice captured";
    };

    recognition.onerror = () => {

        micButton.classList.remove(
            "listening"
        );

        status.innerHTML =
            "⚠ Unable to recognize speech";
    };
}
function startSpeech(fieldId){

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if(!SpeechRecognition){
        alert("Speech Recognition not supported");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;

    const input =
        document.getElementById(fieldId);

    const mic =
        document.getElementById(fieldId + "Mic");

    recognition.onstart = () => {

        mic.classList.add("listening");

        input.classList.add(
            "input-recording"
        );

        input.placeholder =
            "🎤 Listening...";
    };

    recognition.start();

    recognition.onresult = (event) => {

        const speechText =
            event.results[0][0].transcript;

        input.value = speechText;
    };

    recognition.onend = () => {

        mic.classList.remove(
            "listening"
        );

        input.classList.remove(
            "input-recording"
        );

        if(!input.value){
            input.placeholder =
                "Enter Value";
        }
    };

    recognition.onerror = () => {

        mic.classList.remove(
            "listening"
        );

        input.classList.remove(
            "input-recording"
        );

        input.placeholder =
            "Try Again";
    };
}
