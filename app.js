const SCRIPT_URL =
"https://YOUR-EXISTING-APPSCRIPT-URL";

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

        const response = await fetch(
            SCRIPT_URL,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(payload)
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
            alert("Failed");
        }

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