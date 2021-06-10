const form = document.getElementById("txtType");
const txtul = document.getElementById("mainTxt");
const msgInBtn = document.getElementById("msg");
const sendBtn = document.getElementById("submitBtn");
const userNmForm = document.getElementById("userNameForm");
let username;

// detecting username
userNmForm.addEventListener('submit', name => {
    name.preventDefault();
    username = userNmForm.username.value;
    document.querySelector(".modal").style.display = 'none';
    document.querySelector('.modalBack').style.display = 'none';
})


// renderong function
function showData(doc){
    let txtli = document.createElement('li');
    let p = document.createElement('p');
    //let delspan = document.createElement('span');
    txtli.setAttribute('data-id', doc.id);

    p.textContent = doc.data().text;
    //delspan.textContent = 'delete';

    txtli.appendChild(p);
    //txtli.appendChild(delspan);
    txtul.appendChild(txtli);

    //deleting data

    //delspan.addEventListener('click', (e) => {
        //e.stopPropagation();
        //let del_id = e.target.parentElement.getAttribute('data-id');
        //db.collection('users').doc(del_id).delete();
   // });
}

// getting & showing data
// db.collection('users').get().then(snapst => {
//     snapst.docs.forEach(doc => {
//         showData(doc);
//     });
// }).catch(err => {
//     `Failled to load. Error: ${err}`;
// });

// sending data
form.addEventListener('submit', (data) => {
    data.preventDefault();
    let sendDate = new Date();
    db.collection('users').add({
        // text: form.txtmsg.value,
        // text: `${username.innerText}: ${form.txtmsg.value}`,
        text: `${username}: ${form.txtmsg.value}`,
        creditAt: sendDate,
    })

    form.txtmsg.value = '';

    console.clear();
    console.log("Messege added successfully !!!")
});

// real time data-base setup

db.collection('users').orderBy('creditAt').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type === 'added'){
            showData(change.doc);
        } else if(change.type === 'removed'){
            let li = txtul.querySelector(`[data-id=${change.doc.id}]`);
            txtul.removeChild(li);
        }
    })
})
